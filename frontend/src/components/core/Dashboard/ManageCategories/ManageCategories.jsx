import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { VscTag } from "react-icons/vsc"

import {
  getAllCategories,
  createCategory,
  updateCategory,
} from "../../../../services/operations/categoryAPI"

export default function ManageCategories() {
  const { token } = useSelector((state) => state.auth)

  const [categories, setCategories] = useState(null) // null = loading
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [editingId, setEditingId] = useState(null) // null = "create" mode
  const [submitting, setSubmitting] = useState(false)

  const refreshCategories = async () => {
    const res = await getAllCategories()
    setCategories(res || [])
  }

  useEffect(() => {
    refreshCategories()
  }, [])

  const resetForm = () => {
    setName("")
    setDescription("")
    setEditingId(null)
  }

  const startEdit = (category) => {
    setEditingId(category._id)
    setName(category.name)
    setDescription(category.description || "")
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!name.trim()) return

    setSubmitting(true)
    let success
    if (editingId) {
      success = await updateCategory(
        { categoryId: editingId, name, description },
        token
      )
    } else {
      success = await createCategory({ name, description }, token)
    }
    setSubmitting(false)

    if (success) {
      resetForm()
      refreshCategories()
    }
  }

  return (
    <div>
      <h1 className="mb-8 text-4xl font-boogaloo text-richblack-5 text-center sm:text-left">
        Manage Categories
      </h1>

      <div className="flex flex-col gap-10 lg:flex-row">
        {/* Create / Edit form */}
        <form
          onSubmit={handleSubmit}
          className="flex w-full flex-col gap-4 rounded-lg border border-richblack-700 bg-richblack-800 p-6 lg:w-[40%]"
        >
          <h2 className="text-lg font-semibold text-richblack-5">
            {editingId ? "Edit Category" : "Add New Category"}
          </h2>

          <label className="flex flex-col gap-1">
            <span className="text-sm text-richblack-300">Category Name *</span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Web Development"
              required
              className="rounded-md border border-richblack-600 bg-richblack-700 px-3 py-2 text-richblack-5 outline-none focus:border-yellow-50"
            />
          </label>

          <label className="flex flex-col gap-1">
            <span className="text-sm text-richblack-300">Description</span>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Short description shown to students"
              rows={4}
              className="rounded-md border border-richblack-600 bg-richblack-700 px-3 py-2 text-richblack-5 outline-none focus:border-yellow-50"
            />
          </label>

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={submitting}
              className="rounded-md bg-yellow-50 px-5 py-2 font-semibold text-richblack-900 disabled:opacity-50"
            >
              {editingId ? "Save Changes" : "Create Category"}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="rounded-md border border-richblack-600 px-5 py-2 font-semibold text-richblack-5"
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        {/* List of existing categories */}
        <div className="w-full lg:w-[60%]">
          {categories === null && (
            <div className="flex flex-col gap-2">
              <div className="h-12 rounded-lg skeleton" />
              <div className="h-12 rounded-lg skeleton" />
              <div className="h-12 rounded-lg skeleton" />
            </div>
          )}

          {categories?.length === 0 && (
            <div className="grid h-[30vh] place-items-center text-center">
              <div className="flex flex-col items-center gap-2">
                <div className="grid h-16 w-16 place-items-center rounded-full bg-richblack-800 text-yellow-50">
                  <VscTag size={30} />
                </div>
                <p className="text-lg font-semibold text-richblack-5">
                  No categories yet
                </p>
                <p className="text-sm text-richblack-300">
                  Create your first category using the form.
                </p>
              </div>
            </div>
          )}

          {categories && categories.length > 0 && (
            <div className="flex flex-col gap-3">
              {categories.map((category) => (
                <div
                  key={category._id}
                  className="flex items-center justify-between rounded-lg border border-richblack-700 bg-richblack-800 px-5 py-4"
                >
                  <div>
                    <p className="font-semibold text-richblack-5">
                      {category.name}
                    </p>
                    {category.description && (
                      <p className="mt-1 text-sm text-richblack-300">
                        {category.description}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => startEdit(category)}
                    className="rounded-md border border-richblack-600 px-4 py-1.5 text-sm font-semibold text-richblack-5 hover:bg-richblack-700"
                  >
                    Edit
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}