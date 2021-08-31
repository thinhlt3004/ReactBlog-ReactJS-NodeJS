import { CategoryModel } from './../models/Category.js';


class CategoryController {
    create = async (req, res) => {
        try {
            const newCat = new CategoryModel(req.body);
            const category = await newCat.save();
            res.status(200).json(category);
        } catch (error) {
            res.status(500).json(error);
        }

    }

    index = async (req, res) => {
        try {
            const cats = await CategoryModel.find({});
            res.status(200).json(cats);
        } catch (error) {
            res.status(500).json(error);
        }
    }
}

export default new CategoryController();