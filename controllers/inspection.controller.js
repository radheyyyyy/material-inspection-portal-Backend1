import supabase from "../config/supabase.js";

export const createInspection = async (req, res) => {
  try {
    const {
      site_incharge_name,
      project_name,

      adequate_open_area_for_material_storage_is_available,
      whether_the_area_is_barricaded_and_secure_or_not,
      approach_for_machinery_movement_is_available_or_not,
      area_is_elevated_to_avoid_water_logging,
      open_area_size,

      adequate_closed_store_is_available,
      racks_are_provided_for_material_segregation,
      closed_store_size,

      security_guard,
      no_of_guards_agency_details,

      material_issue_slip,
      latest_issue_slip_no_and_attached_copy,
    } = req.body;

    let attachmentUrl = null;

    if (req.file) {
      const fileName =
        Date.now() + "-" + req.file.originalname;

      const { error: uploadError } =
        await supabase.storage
          .from("issue-slips")
          .upload(
            fileName,
            req.file.buffer,
            {
              contentType: req.file.mimetype,
            }
          );

      if (uploadError) {
        return res.status(400).json({
          success: false,
          error: uploadError.message,
        });
      }

      const {
        data: { publicUrl },
      } = supabase.storage
        .from("issue-slips")
        .getPublicUrl(fileName);

      attachmentUrl = publicUrl;
    }

    const { data, error } = await supabase
      .from("submittions")
      .insert([
        {
          site_incharge_name,
          project_name,

          adequate_open_area_for_material_storage_is_available,
          whether_the_area_is_barricaded_and_secure_or_not,
          approach_for_machinery_movement_is_available_or_not,
          area_is_elevated_to_avoid_water_logging,
          open_area_size,

          adequate_closed_store_is_available,
          racks_are_provided_for_material_segregation,
          closed_store_size,

          security_guard,
          no_of_guards_agency_details,

          material_issue_slip,
          latest_issue_slip_no_and_attached_copy,

          issue_slip_attachment:
            attachmentUrl,
        },
      ])
      .select();

    if (error) {
      return res.status(400).json({
        success: false,
        error: error.message,
      });
    }

    res.status(201).json({
      success: true,
      data,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const getAllInspections = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("submittions")
      .select("*")
      .order("id", { ascending: false });

    if (error) {
      return res.status(400).json({
        success: false,
        error: error.message,
      });
    }

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
