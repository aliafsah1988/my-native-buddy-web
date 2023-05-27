import { userService } from "@/services";
import { useUserStore } from "@/stores/user";
import { onMounted } from "vue";

export function useUser() {
  const { setUser } = useUserStore();
  onMounted(async () => {
    setUser(await userService.getUser());
  });
}
