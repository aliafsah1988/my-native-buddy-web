import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import { groupService } from "../services/index";

export const useGroupStore = defineStore("group", () => {
  let group = reactive<any>({});
  const actionType = ref<string>("");
  const groupError = ref<string>("");
  const groupErrorCode = ref<number>(0);

  const setActionType = async (input: string) => {
    actionType.value = input;
  };
  const updateGroup = async (input: any) => {
    Object.assign(group, input);
  };
  const saveGroup = async () => {
    try {
      const result: any = null;
      if (actionType.value === "add") {
        result.value = await groupService.add(
          group.name,
          group.description,
          group.langId
        );
      } else {
        result.value = await groupService.update(
          group._id,
          group.name,
          group.description,
          group.langId
        );
      }
      return result;
    } finally {
      reset();
    }
  };
  // TODO remvoe this and use the one inside grouplist store instead!
  const getGroupById = async (groupId: any) => {
    const result = await groupService.getById(groupId);
    console.log(result);
    Object.assign(group, result);
    return group;
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
