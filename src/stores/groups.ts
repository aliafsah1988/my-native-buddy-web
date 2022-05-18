import { defineStore } from "pinia";
import { reactive } from "vue";

export const useGroupsStore = defineStore("groups", () => {
  const groups = reactive<any[]>([]);

  const setGroups = (payload: any) => {
    groups.splice(0, groups.length);
    payload.forEach((data: any) => {
      groups.push(data);
    });
  };

  const deleteGroup = (groupId: string) => {
    const index = groups.findIndex((group) => group._id === groupId);
    if (index > -1) groups.splice(index, 1);
  };

  return { groups, deleteGroup, setGroups };
});
