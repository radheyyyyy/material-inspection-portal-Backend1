import supabase from "../config/supabase.js";

export const adminLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const { data, error } = await supabase
      .from("admins")
      .select("*")
      .eq("username", username)
      .single();

    if (error || !data) {
      return res.status(401).json({
        success: false,
        message: "Invalid Username",
      });
    }

    if (data.password !== password) {
      return res.status(401).json({
        success: false,
        message: "Invalid Password",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Login Successful",
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};