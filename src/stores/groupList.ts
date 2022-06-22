import {
  GroupService,
  GroupError,
} from "../../_old/src/services/group.service";
import { defineStore } from "pinia";
import { reactive, ref } from "vue";

export const useGroupListStore = defineStore("groupList", () => {
  const groups = reactive<any[]>([]);
  const groupErrorCode = ref<number | null>(null);
  const groupError = ref<string>("");
  const getMyGroups = async () => {
    try {
      Object.assign(groups, []);
      groupErrorCode.value = 0;
      groupError.value = "";
      Object.assign(groups, await GroupService.getMyGroups());
    } catch (e: any) {
      if (e instanceof GroupError) {
        fail(e.errorCode, e.message);
      }
      return false;
    }
  };
  const deleteGroup = async (groupId: any) => {
    try {
      if (await GroupService.deleteById(groupId)) {
        const index = groups.findIndex((group) => group._id === groupId);
        if (index > -1) groups.splice(index, 1);
      }
    } catch (e: any) {
      if (e instanceof GroupError) {
        fail(e.errorCode, e.message);
      }
      return false;
    }
  };
  const fail = (errorCode: number, errorMessage: string) => {
    groupErrorCode.value = errorCode;
    groupError.value = errorMessage;
  };
  return { groups, getMyGroups, deleteGroup };
});
