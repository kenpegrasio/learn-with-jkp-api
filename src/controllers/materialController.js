import Material from "../models/Material.js";

export const createMaterial = async (req, res) => {
  try {
    const material = new Material({
      ...req.body,
      description: req.body.description || "",
    });
    await material.save();
    res.status(201).json(material);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occured" });
    }
  }
};

export const getMaterials = async (req, res) => {
  try {
    const materials = await Material.find();
    res.status(200).json(materials);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occured" });
    }
  }
};

export const getMaterialsbyID = async (req, res) => {
  try {
    const materials = await Material.find({
      subject_id: req.params.id,
    });
    res.status(200).json(materials);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occured" });
    }
  }
};

export const deleteMaterialbyID = async (req, res) => {
  try {
    const material = await Material.findOneAndDelete({
      _id: req.params.id,
    });
    if (!material) {
      res.status(404).json({ message: "Material not found " });
    } else {
      res.status(200).json({ message: "Material deleted successfully" });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occured" });
    }
  }
};
