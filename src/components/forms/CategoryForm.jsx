import React from 'react'

const CategoryForm = ({handleCategoryForm,categoryName,setCategoryName}) => {
  return (
    <form onSubmit={handleCategoryForm}>
    <div className="mb-3">
      <input
        type="text"
        className="form-control"
        placeholder="Enter new category name"
        value={categoryName}
        onChange={(e)=>setCategoryName(e.target.value)}
    
      />
    </div>
    <button type="submit" className="btn btn-primary">
      Submit
    </button>
  </form>
  )
}

export default CategoryForm;