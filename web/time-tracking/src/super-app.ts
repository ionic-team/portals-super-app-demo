import { registerPlugin } from "@capacitor/core/";
import { getInitialContext } from "@ionic/portals";

export type Context = {
  supabase: {
    url: string;
    accessToken: string;
    refreshToken: string;
  };
  resourceId: number;
};

interface DismissPlugin {
  dismiss(): Promise<void>;
}

export const dismissPlugin = registerPlugin<DismissPlugin>("Dismiss", {});
export const initialContext = getInitialContext<Context>()!.value!;
