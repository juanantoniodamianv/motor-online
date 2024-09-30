import { createClient } from "@/src/app/utils/supabase/server";
import { AuthError } from "@supabase/supabase-js";
import { User } from "@/src/app/types";

export default async function useServerUser(): Promise<{
  error: AuthError | string | null;
  isAuthenticated: boolean;
  isAdmin?: boolean;
  user?: User | null;
}> {
  try {
    const supabase = createClient();
    const { data: authData, error: authError } = await supabase.auth.getUser();

    if (authError !== null) {
      throw authError;
    }

    const isAuthenticated = !!authData?.user;

    // AFAIK it never should occurs, just in case
    if (!isAuthenticated) {
      return { isAuthenticated: false, error: authError };
    }

    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("*")
      .eq("id", authData.user.id)
      .single();

    if (userError !== null) {
      throw userError;
    }

    const user = userData;
    const isAdmin = user?.role === "admin";

    return { error: null, isAuthenticated, isAdmin, user };
  } catch (err) {
    const isAuthenticated = false;
    if (err instanceof AuthError) {
      const error = err.message;
      return { error, isAuthenticated };
    }

    return { error: "Something went wrong", isAuthenticated };
  }
}
