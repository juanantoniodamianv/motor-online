import { createClient } from "@/src/app/utils/supabase/server";
import { AuthError } from "@supabase/supabase-js";

export async function checkAuth() {
  const supabase = createClient();

  try {
    const { data: authData, error: authError } = await supabase.auth.getUser();

    if (authError !== null) {
      throw authError;
    }

    const isAuthenticated = !!authData?.user;

    if (!isAuthenticated) {
      return { isAuthenticated: false, isAdmin: false, user: null };
    }

    // Fetch user data
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

    return { isAuthenticated: true, isAdmin, user };
  } catch (err) {
    if (err instanceof AuthError) {
      return {
        error: err.message,
        isAuthenticated: false,
        isAdmin: false,
        user: null,
      };
    }
    return {
      error: "Something went wrong",
      isAuthenticated: false,
      isAdmin: false,
      user: null,
    };
  }
}
