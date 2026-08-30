const Category = require('../models/category')

// get Random Integer
function getRandomInt(max) {
    return Math.floor(Math.random() * max)
}

// ================ create Category ================
exports.createCategory = async (req, res) => {
    try {
        // extract data
        const { name, description } = req.body;

        // validation
        if (!name || !description) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }

        const categoryDetails = await Category.create({
            name: name, description: description
        });

        res.status(200).json({
            success: true,
            message: 'Category created successfully'
        });
    }
    catch (error) {
        console.log('Error while creating Category');
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Error while creating Category',
            error: error.message
        })
    }
}


// ================ update Category (Admin only) ================
// New: previously there was no way to edit a category at all once created -
// only createCategory existed.
exports.updateCategory = async (req, res) => {
    try {
        const { categoryId, name, description } = req.body;

        if (!categoryId || !name) {
            return res.status(400).json({
                success: false,
                message: 'categoryId and name are required'
            });
        }

        const updatedCategory = await Category.findByIdAndUpdate(
            categoryId,
            { name, description },
            { new: true }
        );

        if (!updatedCategory) {
            return res.status(404).json({
                success: false,
                message: 'Category not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Category updated successfully',
            data: updatedCategory,
        });
    }
    catch (error) {
        console.log('Error while updating Category');
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Error while updating Category',
            error: error.message
        })
    }
}


// ================ get All Category ================
exports.showAllCategories = async (req, res) => {
    try {
        // get all category from DB
        const allCategories = await Category.find({}, { name: true, description: true });
        // return response
        res.status(200).json({
            success: true,
            data: allCategories,
            message: 'All allCategories fetched successfully'
        })
    }
    catch (error) {
        console.log('Error while fetching all allCategories');
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Error while fetching all allCategories'
        })
    }
}



// ================ Get Category Page Details ================
exports.getCategoryPageDetails = async (req, res) => {
    try {
        const { categoryId } = req.body
        // console.log("PRINTING CATEGORY ID: ", categoryId);

        // Get courses for the specified category
        const selectedCategory = await Category.findById(categoryId)
            .populate({
                path: "courses",
                match: { status: "Published" },
                populate: "ratingAndReviews",
            })
            .exec()

        // console.log('selectedCategory = ', selectedCategory)
        // Handle the case when the category is not found
        if (!selectedCategory) {
            // console.log("Category not found.")
            return res.status(404).json({ success: false, message: "Category not found" })
        }



        // BUGFIX: this used to return a hard 404 whenever a category simply had
        // zero published courses yet - a normal, expected state (e.g. right
        // after a new category is created) - not an error. The frontend then
        // treated it as a failed fetch instead of an empty state. Now we
        // return 200 with empty data so the UI can render "no courses yet"
        // gracefully instead of surfacing this as a broken/fallback error.
        if (selectedCategory.courses.length === 0) {
            return res.status(200).json({
                success: true,
                data: {
                    selectedCategory,
                    differentCategory: null,
                    mostSellingCourses: [],
                },
                message: "No courses found for the selected category.",
            })
        }

        // Get courses for other categories
        const categoriesExceptSelected = await Category.find({
            _id: { $ne: categoryId },
        })

        // BUGFIX: two bugs here previously -
        // 1) When only one category exists in the DB, categoriesExceptSelected
        //    is an empty array, so indexing into it threw a TypeError
        //    ("Cannot read properties of undefined") which bubbled up as a
        //    500 on the whole category page endpoint.
        // 2) Category.findOne(someObjectId) is invalid Mongoose usage - passing
        //    an ObjectId as the filter object does not reliably match by _id.
        //    This should be Category.findById(id).
        let differentCategory = null
        if (categoriesExceptSelected.length > 0) {
            const randomCategory =
                categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]
            differentCategory = await Category.findById(randomCategory._id)
                .populate({
                    path: "courses",
                    match: { status: "Published" },
                })
                .exec()
        }

        //console.log("Different COURSE", differentCategory)
        // Get top-selling courses across all categories
        const allCategories = await Category.find()
            .populate({
                path: "courses",
                match: { status: "Published" },
                populate: {
                    path: "instructor",
                },
            })
            .exec()

        const allCourses = allCategories.flatMap((category) => category.courses)
        const mostSellingCourses = allCourses
            .sort((a, b) => b.sold - a.sold)
            .slice(0, 10)

        // console.log("mostSellingCourses COURSE", mostSellingCourses)
        res.status(200).json({
            success: true,
            data: {
                selectedCategory,
                differentCategory,
                mostSellingCourses,
            },
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        })
    }
}