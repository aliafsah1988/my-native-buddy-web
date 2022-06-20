import {
  GroupService,
  GroupError,
} from "../../_old/src/services/group.service";
import { defineStore } from "pinia";
import { reactive, ref } from "vue";

export const useGroupStore = defineStore("group", () => {
  let group = reactive<any>({});
  const actionType = ref<string>("");
  const groupError = ref<string>("");
  const groupErrorCode = ref<number>(0);
  const setActionType = async (input: string) => {
    actionType.value = input;
  };
  const updateGroup = async (group: any) => {
    group.value = group;
  };
  const saveGroup = async () => {
    try {
      const result: any = null;
      if (actionType.value === "add") {
        result.value = await GroupService.add(
          group.name,
          group.description,
          group.langId
        );
      } else {
        result.value = await GroupService.update(
          group._id,
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
      const result = await GroupService.getById(groupId);
      console.log(result);
      Object.assign(group, result);
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
    group = reactive<any>({});
    groupErrorCode.value = 0;
    groupError.value = "";
  };
  return {
    getGroupById,
    group,
    setActionType,
    reset,
    updateGroup,
    saveGroup,
  };
});
