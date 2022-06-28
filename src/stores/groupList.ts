import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import { groupService } from "../services/index";

export const useGroupListStore = defineStore("groupList", () => {
  const groups = reactive<any[]>([]);
  const groupErrorCode = ref<number | null>(null);
  const groupError = ref<string>("");

  const getMyGroups = async () => {
    Object.assign(groups, []);
    groupErrorCode.value = 0;
    groupError.value = "";
    Object.assign(groups, await groupService.getMyGroups());
  };
  const deleteGroup = async (groupId: any) => {
    if (await groupService.deleteById(groupId)) {
      const index = groups.findIndex((group) => group._id === groupId);
      if (index > -1) groups.splice(index, 1);
    }
  };

  return { groups, getMyGroups, deleteGroup };
});
