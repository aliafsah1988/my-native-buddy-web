import {
  GroupService,
  GroupError,
} from "../../_old/src/services/group.service";
import { defineStore } from "pinia";
import { reactive, ref } from "vue";

export const useGroupStore = defineStore("group", () => {
  const group = reactive<any>(null);
  const actionType = ref<string>("");
  const editGroup = reactive<any>({});
  const groupError = ref<string>("");
  const groupErrorCode = ref<number>(0);
  const setActionType = async (actionType: any) => {
    actionType.value = actionType;
  };
  const updateGroup = async (group: any) => {
    group.value = group;
  };
  const saveGroup = async (state: any) => {
    try {
      const result: any = null;
      if (state.actionType === "add") {
        result.value = await GroupService.add(
          group.name,
          group.description,
          group.langId
        );
      } else {
        result.value = await GroupService.update(
          editGroup._id,
          group.name,
          group.description,
          group.langId
        );
      }
      return result;
    } catch (e: any) {
      if (e instanceof GroupError) {
        fail(e.errorCode, e.message);
      }
      return false;
    } finally {
      reset();
    }
  };
  const getGroupById = async (groupId: any) => {
    try {
      console.log("getGroupById");
      const group = await GroupService.getById(groupId);
      Object.assign(editGroup, group);
      return group;
    } catch (e: any) {
      if (e instanceof GroupError) {
        fail(e.errorCode, e.message);
      }
      return undefined;
    }
  };
  const fail = (errorCode: number, errorMessage: string) => {
    groupErrorCode.value = errorCode;
    groupError.value = errorMessage;
  };
  const reset = () => {
    Object.assign(group, null);
    groupErrorCode.value = 0;
    groupError.value = "";
    Object.assign(editGroup, undefined);
  };
  return { getGroupById };
});
