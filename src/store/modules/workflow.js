import axios from 'axios';
import { generateCurdManager } from '@/store/baseManager';
import { actionTypes } from '@/store/actionTypes';
import { WorkflowInstanceStatus as wis, WorkflowTaskStatus } from '@/store/enum';

const url = '/workflow';

const store = generateCurdManager({
    url,
    listProperty: 'workflows',
    namespaced: true,
});

class WorkflowInstanceStatus {
    constructor (instanceStatus) {
        _.forOwn(instanceStatus, (value, key) => {
            this[key] = value;
        });

        this.currentStepCode = _.last(instanceStatus.steps).code;
        this.currentStepName = _.last(instanceStatus.steps).name;

        this.result = instanceStatus.status === wis.Finish ? _.last(instanceStatus.steps).result : null;

        this.executors = []; // 待办人员
        this.actualExecuteUsers = []; // 已办人员
        _.forEach(instanceStatus.steps, step => {
            _.forEach(step.tasks, task => {
                if (task.status === WorkflowTaskStatus.Todo) {
                    this.executors.push({
                        id: task.executorId,
                        name: task.executorName,
                    });
                } else if (task.status === WorkflowTaskStatus.Finish) {
                    this.actualExecuteUsers.push({
                        id: task.actualExecutorId,
                        name: task.actualExecutorName,
                    });
                }
            });
        });
    }

    // 判断用户是否是当前实例当前步骤的待办人员
    isExecutorUser (user) {
        const allIds = user ? _.concat(user.id, user.groupIds, user.departmentIds, user.postIds) : [];
        return _.intersection(allIds, _.map(this.executors, 'id')).length > 0;
    }

    // 判断用户是否是当前实例的参与者
    isActor (user) {
        const allIds = user ? _.concat(user.groupIds, user.departmentIds, user.postIds) : [];
        const allActorIds = _.map(_.concat(this.executors, this.actualExecuteUsers), 'id');
        return _.intersection(allIds, allActorIds).length > 0;
    }
}

const { actions } = store;

actions[actionTypes.workflow.checkRecorderCreatorClassName] = async (store, className) => {
    const { data } = await axios.post(`${url}/check_recorder_creator_class_name`, className, {
        headers: { 'Content-Type': 'text/plain' },
    });
    return data.success;
};

actions[actionTypes.workflow.getTasks] = async (store, query) => {
    const { data } = await axios.post(`${url}/tasks`, query);
    return data;
};

actions[actionTypes.workflow.getInstanceStatus] = async (store, instanceId) => {
    const { data } = await axios.get(`${url}/instance_status/${instanceId}`);
    return new WorkflowInstanceStatus(data);
};

export default store;
