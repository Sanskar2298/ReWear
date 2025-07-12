"use client"

import { useState } from "react"
import {
    Upload,
    X,
    Plus,
    Camera,
    Shirt,
    Crown,
    Scissors,
    Palette,
    Recycle,
    ChevronLeft,
    Save,
    Eye,
    Tag,
    Package,
    Info,
    AlertCircle,
} from "lucide-react"

const AddNewItemPage = ({ onSubmit, userPreviousListings = [] }) => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        category: "",
        type: "",
        size: "",
        condition: "",
        brand: "",
        material: "",
        color: "",
        pointValue: "",
        tags: [],
    })

    const [images, setImages] = useState([])
    const [dragActive, setDragActive] = useState(false)
    const [currentTag, setCurrentTag] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [errors, setErrors] = useState({})

    const categories = ["Jackets", "Tops", "Bottoms", "Dresses", "Shoes", "Accessories", "Bags", "Jewelry"]

    const conditions = [
        { value: "excellent", label: "Excellent", color: "text-emerald-700 bg-emerald-50 border-emerald-200" },
        { value: "good", label: "Good", color: "text-blue-700 bg-blue-50 border-blue-200" },
        { value: "fair", label: "Fair", color: "text-amber-700 bg-amber-50 border-amber-200" },
        { value: "poor", label: "Poor", color: "text-red-700 bg-red-50 border-red-200" },
    ]

    const sizes = ["XS", "S", "M", "L", "XL", "XXL", "One Size"]

    const handleInputChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: null }))
        }
    }

    const handleImageUpload = (files) => {
        const newImages = Array.from(files)
            .slice(0, 8 - images.length)
            .map((file) => ({
                file,
                url: URL.createObjectURL(file),
                id: Math.random().toString(36).substr(2, 9),
            }))
        setImages((prev) => [...prev, ...newImages])
    }

    const removeImage = (id) => {
        setImages((prev) => prev.filter((img) => img.id !== id))
    }

    const handleDrag = (e) => {
        e.preventDefault()
        e.stopPropagation()
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true)
        } else if (e.type === "dragleave") {
            setDragActive(false)
        }
    }

    const handleDrop = (e) => {
        e.preventDefault()
        e.stopPropagation()
        setDragActive(false)

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleImageUpload(e.dataTransfer.files)
        }
    }

    const addTag = () => {
        if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
            setFormData((prev) => ({
                ...prev,
                tags: [...prev.tags, currentTag.trim()],
            }))
            setCurrentTag("")
        }
    }

    const removeTag = (tagToRemove) => {
        setFormData((prev) => ({
            ...prev,
            tags: prev.tags.filter((tag) => tag !== tagToRemove),
        }))
    }

    const validateForm = () => {
        const newErrors = {}

        if (!formData.title.trim()) newErrors.title = "Title is required"
        if (!formData.description.trim()) newErrors.description = "Description is required"
        if (!formData.category) newErrors.category = "Category is required"
        if (!formData.size) newErrors.size = "Size is required"
        if (!formData.condition) newErrors.condition = "Condition is required"
        if (images.length === 0) newErrors.images = "At least one image is required"

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!validateForm()) return

        setIsSubmitting(true)

        try {
            const itemData = {
                ...formData,
                images: images.map((img) => img.url),
                pointValue: Number.parseInt(formData.pointValue) || 100,
                listedDate: new Date().toISOString(),
                isAvailable: true,
            }

            await onSubmit(itemData)

            // Reset form
            setFormData({
                title: "",
                description: "",
                category: "",
                type: "",
                size: "",
                condition: "",
                brand: "",
                material: "",
                color: "",
                pointValue: "",
                tags: [],
            })
            setImages([])
        } catch (error) {
            console.error("Error submitting item:", error)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="bg-gradient-to-br from-slate-50 via-white to-emerald-50/30 relative overflow-hidden">
            {/* Floating Clothing Elements */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-20 left-10 w-8 h-8 text-emerald-200/30 animate-pulse">
                    <Shirt className="w-full h-full" />
                </div>
                <div
                    className="absolute top-40 right-20 w-6 h-6 text-blue-200/30 animate-bounce"
                    style={{ animationDelay: "1s" }}
                >
                    <Crown className="w-full h-full" />
                </div>
                <div
                    className="absolute bottom-40 left-20 w-7 h-7 text-purple-200/30 animate-pulse"
                    style={{ animationDelay: "2s" }}
                >
                    <Scissors className="w-full h-full" />
                </div>
                <div
                    className="absolute top-60 right-40 w-5 h-5 text-pink-200/30 animate-bounce"
                    style={{ animationDelay: "0.5s" }}
                >
                    <Palette className="w-full h-full" />
                </div>
            </div>

            {/* Header */}
            <div className="bg-white/80 backdrop-blur-sm border-b border-slate-200/60">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-transparent to-blue-500/10"></div>
                <div className="relative max-w-7xl mx-auto px-6 py-6">
                    <div className="flex items-center justify-between">
                        <button className="flex items-center space-x-3 text-slate-600 hover:text-slate-900 transition-colors duration-200">
                            <ChevronLeft className="w-5 h-5" />
                            <span className="font-medium">Back to Browse</span>
                        </button>
                        <div className="text-center">
                            <h1 className="text-2xl font-bold text-slate-900">Add New Item</h1>
                            <p className="text-slate-600 text-sm">List your item for style swapping</p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <button className="px-4 py-2 bg-slate-700 text-slate-300 rounded-xl hover:bg-slate-600 transition-all duration-200 flex items-center space-x-2">
                                <Eye className="w-4 h-4" />
                                <span>Preview</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-10">
                <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Left Column - Images */}
                    <div className="space-y-8">
                        {/* Image Upload */}
                        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl shadow-slate-200/50 border border-white/50 p-8">
                            <div className="flex items-center space-x-3 mb-6">
                                <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center">
                                    <Camera className="w-4 h-4 text-white" />
                                </div>
                                <h3 className="text-lg font-bold text-slate-900">Add Images</h3>
                                <span className="text-slate-500 text-sm">({images.length}/8)</span>
                            </div>

                            {/* Main Upload Area */}
                            <div
                                className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 ${dragActive ? "border-emerald-500 bg-emerald-500/10" : "border-slate-600 hover:border-slate-500"
                                    } ${errors.images ? "border-red-500" : ""}`}
                                onDragEnter={handleDrag}
                                onDragLeave={handleDrag}
                                onDragOver={handleDrag}
                                onDrop={handleDrop}
                            >
                                <input
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    onChange={(e) => handleImageUpload(e.target.files)}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                />
                                <Upload className="w-12 h-12 text-slate-500 mx-auto mb-4" />
                                <p className="text-slate-900 font-semibold mb-2">Drop images here or click to upload</p>
                                <p className="text-slate-500 text-sm">PNG, JPG up to 10MB each</p>
                            </div>

                            {errors.images && (
                                <p className="text-red-400 text-sm mt-2 flex items-center">
                                    <AlertCircle className="w-4 h-4 mr-1" />
                                    {errors.images}
                                </p>
                            )}

                            {/* Image Preview Grid */}
                            {images.length > 0 && (
                                <div className="grid grid-cols-2 gap-4 mt-6">
                                    {images.map((image, index) => (
                                        <div key={image.id} className="relative group">
                                            <img
                                                src={image.url || "/placeholder.svg"}
                                                alt={`Upload ${index + 1}`}
                                                className="w-full h-32 object-cover rounded-xl border border-slate-600"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => removeImage(image.id)}
                                                className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                                            >
                                                <X className="w-3 h-3" />
                                            </button>
                                            {index === 0 && (
                                                <div className="absolute bottom-2 left-2 bg-emerald-500 text-white px-2 py-1 rounded text-xs font-medium">
                                                    Main
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Previous Listings */}
                        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl shadow-slate-200/50 border border-white/50 p-8">
                            <div className="flex items-center space-x-3 mb-6">
                                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                                    <Package className="w-4 h-4 text-white" />
                                </div>
                                <h3 className="text-lg font-bold text-slate-900">Previous Listings</h3>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                {userPreviousListings.slice(0, 4).map((item, index) => (
                                    <div key={index} className="bg-slate-700/50 rounded-xl p-4 border border-slate-600">
                                        <div className="w-full h-24 bg-slate-600 rounded-lg mb-3 flex items-center justify-center">
                                            <Shirt className="w-6 h-6 text-slate-400" />
                                        </div>
                                        <p className="text-slate-900 text-sm font-medium truncate">{item.title || "Previous Item"}</p>
                                        <p className="text-slate-500 text-xs">{item.category || "Category"}</p>
                                    </div>
                                ))}
                                {Array.from({ length: Math.max(0, 4 - userPreviousListings.length) }).map((_, index) => (
                                    <div
                                        key={`empty-${index}`}
                                        className="bg-slate-700/30 rounded-xl p-4 border border-slate-600 border-dashed"
                                    >
                                        <div className="w-full h-24 bg-slate-600/30 rounded-lg mb-3"></div>
                                        <div className="h-4 bg-slate-600/30 rounded mb-1"></div>
                                        <div className="h-3 bg-slate-600/30 rounded w-2/3"></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Form Details */}
                    <div className="space-y-8">
                        {/* Basic Information */}
                        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl shadow-slate-200/50 border border-white/50 p-8">
                            <div className="flex items-center space-x-3 mb-6">
                                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                                    <Info className="w-4 h-4 text-white" />
                                </div>
                                <h3 className="text-lg font-bold text-slate-900">Item Details</h3>
                            </div>

                            <div className="space-y-6">
                                {/* Title */}
                                <div>
                                    <label className="block text-sm font-semibold text-slate-600 mb-2">Title *</label>
                                    <input
                                        type="text"
                                        value={formData.title}
                                        onChange={(e) => handleInputChange("title", e.target.value)}
                                        placeholder="e.g., Vintage Denim Jacket"
                                        className={`w-full bg-white/50 border rounded-xl px-4 py-3 text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-200 ${errors.title ? "border-red-500" : "border-slate-200"
                                            }`}
                                    />
                                    {errors.title && <p className="text-red-400 text-sm mt-1">{errors.title}</p>}
                                </div>

                                {/* Description */}
                                <div>
                                    <label className="block text-sm font-semibold text-slate-600 mb-2">Description *</label>
                                    <textarea
                                        value={formData.description}
                                        onChange={(e) => handleInputChange("description", e.target.value)}
                                        placeholder="Describe your item's condition, style, and any special features..."
                                        rows={4}
                                        className={`w-full bg-white/50 border rounded-xl px-4 py-3 text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-200 resize-none ${errors.description ? "border-red-500" : "border-slate-200"
                                            }`}
                                    />
                                    {errors.description && <p className="text-red-400 text-sm mt-1">{errors.description}</p>}
                                </div>

                                {/* Category and Type */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-600 mb-2">Category *</label>
                                        <select
                                            value={formData.category}
                                            onChange={(e) => handleInputChange("category", e.target.value)}
                                            className={`w-full bg-white/50 border rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-200 ${errors.category ? "border-red-500" : "border-slate-200"
                                                }`}
                                        >
                                            <option value="">Select category</option>
                                            {categories.map((cat) => (
                                                <option key={cat} value={cat}>
                                                    {cat}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.category && <p className="text-red-400 text-sm mt-1">{errors.category}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-slate-600 mb-2">Type</label>
                                        <input
                                            type="text"
                                            value={formData.type}
                                            onChange={(e) => handleInputChange("type", e.target.value)}
                                            placeholder="e.g., Casual, Formal"
                                            className="w-full bg-white/50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-200"
                                        />
                                    </div>
                                </div>

                                {/* Size and Condition */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-600 mb-2">Size *</label>
                                        <select
                                            value={formData.size}
                                            onChange={(e) => handleInputChange("size", e.target.value)}
                                            className={`w-full bg-white/50 border rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-200 ${errors.size ? "border-red-500" : "border-slate-200"
                                                }`}
                                        >
                                            <option value="">Select size</option>
                                            {sizes.map((size) => (
                                                <option key={size} value={size}>
                                                    {size}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.size && <p className="text-red-400 text-sm mt-1">{errors.size}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-slate-600 mb-2">Condition *</label>
                                        <select
                                            value={formData.condition}
                                            onChange={(e) => handleInputChange("condition", e.target.value)}
                                            className={`w-full bg-white/50 border rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-200 ${errors.condition ? "border-red-500" : "border-slate-200"
                                                }`}
                                        >
                                            <option value="">Select condition</option>
                                            {conditions.map((condition) => (
                                                <option key={condition.value} value={condition.value}>
                                                    {condition.label}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.condition && <p className="text-red-400 text-sm mt-1">{errors.condition}</p>}
                                    </div>
                                </div>

                                {/* Brand, Material, Color */}
                                <div className="grid grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-600 mb-2">Brand</label>
                                        <input
                                            type="text"
                                            value={formData.brand}
                                            onChange={(e) => handleInputChange("brand", e.target.value)}
                                            placeholder="e.g., Nike"
                                            className="w-full bg-white/50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-200"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-slate-600 mb-2">Material</label>
                                        <input
                                            type="text"
                                            value={formData.material}
                                            onChange={(e) => handleInputChange("material", e.target.value)}
                                            placeholder="e.g., Cotton"
                                            className="w-full bg-white/50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-200"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-slate-600 mb-2">Color</label>
                                        <input
                                            type="text"
                                            value={formData.color}
                                            onChange={(e) => handleInputChange("color", e.target.value)}
                                            placeholder="e.g., Blue"
                                            className="w-full bg-white/50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-200"
                                        />
                                    </div>
                                </div>

                                {/* Point Value */}
                                <div>
                                    <label className="block text-sm font-semibold text-slate-600 mb-2">Style Points Value</label>
                                    <input
                                        type="number"
                                        value={formData.pointValue}
                                        onChange={(e) => handleInputChange("pointValue", e.target.value)}
                                        placeholder="100"
                                        min="1"
                                        className="w-full bg-white/50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-200"
                                    />
                                    <p className="text-slate-500 text-sm mt-1">
                                        Leave empty for auto-calculation based on brand and condition
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>

                {/* Full Width Tags and Submit Section */}
                <div className="mt-12 space-y-8">
                    {/* Tags */}
                    <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl shadow-slate-200/50 border border-white/50 p-8">
                        <div className="max-w-4xl mx-auto">
                            <div className="flex items-center justify-center space-x-3 mb-6">
                                <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                                    <Tag className="w-4 h-4 text-white" />
                                </div>
                                <h3 className="text-lg font-bold text-slate-900">Tags</h3>
                            </div>

                            <div className="space-y-4">
                                <div className="flex space-x-2 max-w-2xl mx-auto">
                                    <input
                                        type="text"
                                        value={currentTag}
                                        onChange={(e) => setCurrentTag(e.target.value)}
                                        onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                                        placeholder="Add tags (e.g., vintage, summer, casual)"
                                        className="flex-1 bg-white/50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-200"
                                    />
                                    <button
                                        type="button"
                                        onClick={addTag}
                                        className="px-4 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-all duration-200"
                                    >
                                        <Plus className="w-4 h-4" />
                                    </button>
                                </div>

                                {formData.tags.length > 0 && (
                                    <div className="flex flex-wrap gap-2 justify-center max-w-4xl mx-auto">
                                        {formData.tags.map((tag, index) => (
                                            <span
                                                key={index}
                                                className="inline-flex items-center space-x-2 bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm border border-emerald-200"
                                            >
                                                <span>{tag}</span>
                                                <button
                                                    type="button"
                                                    onClick={() => removeTag(tag)}
                                                    className="text-emerald-600 hover:text-emerald-800"
                                                >
                                                    <X className="w-3 h-3" />
                                                </button>
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl shadow-slate-200/50 border border-white/50 p-8">
                        <div className="max-w-2xl mx-auto space-y-4">
                            <div className="flex items-center justify-center space-x-2 text-emerald-600 text-sm">
                                <Recycle className="w-4 h-4" />
                                <span>By listing this item, you're contributing to sustainable fashion!</span>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                onClick={handleSubmit}
                                className="w-full group bg-gradient-to-r from-emerald-600 to-emerald-700 text-white py-4 px-6 rounded-2xl hover:from-emerald-700 hover:to-emerald-800 transition-all duration-300 shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <div className="flex items-center justify-center space-x-3">
                                    {isSubmitting ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                            <span className="text-lg font-semibold">Listing Item...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Save className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                                            <span className="text-lg font-semibold">List Item for Swap</span>
                                        </>
                                    )}
                                </div>
                                {!isSubmitting && (
                                    <p className="text-emerald-100 text-sm mt-1">Your item will be available for swapping immediately</p>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


const samplePreviousListings = [
    { title: "Summer Dress", category: "Dresses" },
    { title: "Leather Jacket", category: "Jackets" },
]

export default function AddNewItem() {
    const handleSubmit = async (itemData) => {
        console.log("New item submitted:", itemData)

        alert("Item listed successfully!")
    }

    return <AddNewItemPage onSubmit={handleSubmit} userPreviousListings={samplePreviousListings} />
}
