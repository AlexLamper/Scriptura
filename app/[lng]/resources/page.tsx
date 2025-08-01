"use client"

import { useState } from "react"
import { useTranslation } from "../../../app/i18n/client"
import { Search, ExternalLink, Star, Filter } from "lucide-react"
import { use } from "react"
import { Button } from "../../../components/ui/button"

// Sample product data - user will add actual affiliate links
const sampleProducts = [
  {
    id: 1,
    title: "ESV Study Bible",
    description: "In-depth study notes, maps, charts, and articles to help you understand Scripture better.",
    category: "Study Bibles",
    type: "bible",
    price: "$29.99",
    rating: 4.9,
    reviews: 2841,
    image: "/images/placeholder-bible.jpg",
    affiliateUrl: "#", // User will replace with actual affiliate link
    features: ["Study Notes", "Maps & Charts", "Cross-references", "Concordance"]
  },
  {
    id: 2,
    title: "NIV Life Application Study Bible",
    description: "Practical application notes that help you apply biblical truths to everyday life.",
    category: "Study Bibles",
    type: "bible",
    price: "$34.99",
    rating: 4.8,
    reviews: 1952,
    image: "/images/placeholder-bible.jpg",
    affiliateUrl: "#",
    features: ["Application Notes", "Character Profiles", "Timeline", "Harmony of Gospels"]
  },
  {
    id: 3,
    title: "How to Read the Bible for All Its Worth",
    description: "A guide to understanding the Bible's different literary genres and historical contexts.",
    category: "Bible Study",
    type: "book",
    price: "$16.99",
    rating: 4.7,
    reviews: 743,
    image: "/images/placeholder-book.jpg",
    affiliateUrl: "#",
    features: ["Literary Analysis", "Historical Context", "Study Methods", "Practical Application"]
  },
  {
    id: 4,
    title: "Inductive Bible Study",
    description: "Learn the proven three-step approach to studying Scripture for yourself.",
    category: "Bible Study",
    type: "book",
    price: "$14.99",
    rating: 4.6,
    reviews: 521,
    image: "/images/placeholder-book.jpg",
    affiliateUrl: "#",
    features: ["Observation Techniques", "Interpretation Methods", "Application Principles", "Study Tools"]
  },
  {
    id: 5,
    title: "NASB MacArthur Study Bible",
    description: "Comprehensive study notes from one of today's foremost Bible teachers.",
    category: "Study Bibles",
    type: "bible",
    price: "$39.99",
    rating: 4.8,
    reviews: 1653,
    image: "/images/placeholder-bible.jpg",
    affiliateUrl: "#",
    features: ["Verse-by-verse Notes", "Theological Insights", "Word Studies", "Topical Index"]
  },
  {
    id: 6,
    title: "Bible Study Methods",
    description: "Twelve different approaches to studying the Bible for personal growth and ministry.",
    category: "Bible Study",
    type: "book",
    price: "$18.99",
    rating: 4.5,
    reviews: 892,
    image: "/images/placeholder-book.jpg",
    affiliateUrl: "#",
    features: ["12 Study Methods", "Practical Examples", "Study Worksheets", "Group Study Guide"]
  }
]

const categories = ["All", "Study Bibles", "Bible Study", "Commentaries", "Devotionals"]

export default function ResourcesPage({ params }: { params: Promise<{ lng: string }> }) {
  const { lng } = use(params)
  const { t } = useTranslation(lng, "resources")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedType, setSelectedType] = useState("all")

  // Filter products based on search term, category, and type
  const filteredProducts = sampleProducts.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory
    const matchesType = selectedType === "all" || product.type === selectedType
    
    return matchesSearch && matchesCategory && matchesType
  })

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t("page_title") || "Bible Study Resources"}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t("page_description") || "Discover the best Bibles, study guides, and resources to deepen your understanding of Scripture."}
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder={t("search_placeholder") || "Search resources..."}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {t(`category_${category.toLowerCase().replace(' ', '_')}`) || category}
                  </option>
                ))}
              </select>
            </div>

            {/* Type Filter */}
            <div className="flex gap-2">
              <Button
                variant={selectedType === "all" ? "default" : "outline"}
                onClick={() => setSelectedType("all")}
                className="flex-1"
              >
                {t("all_types") || "All"}
              </Button>
              <Button
                variant={selectedType === "bible" ? "default" : "outline"}
                onClick={() => setSelectedType("bible")}
                className="flex-1"
              >
                {t("bibles") || "Bibles"}
              </Button>
              <Button
                variant={selectedType === "book" ? "default" : "outline"}
                onClick={() => setSelectedType("book")}
                className="flex-1"
              >
                {t("books") || "Books"}
              </Button>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {t("results_count", { count: filteredProducts.length }) || 
             `Showing ${filteredProducts.length} ${filteredProducts.length === 1 ? 'resource' : 'resources'}`}
          </p>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
              >
                {/* Product Image */}
                <div className="h-48 bg-gray-100 dark:bg-gray-700 relative">
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                    <div className="text-center">
                      <div className="text-4xl mb-2">
                        {product.type === 'bible' ? '📖' : '📚'}
                      </div>
                      <div className="text-sm">
                        {product.type === 'bible' ? 'Bible' : 'Book'} Cover
                      </div>
                    </div>
                  </div>
                </div>

                {/* Product Content */}
                <div className="p-6">
                  {/* Header */}
                  <div className="mb-4">
                    <div className="flex items-start justify-between mb-2">
                      <span className="text-xs px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 font-medium">
                        {product.category}
                      </span>
                      <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                        {product.price}
                      </span>
                    </div>
                    
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2 line-clamp-2">
                      {product.title}
                    </h3>
                    
                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(product.rating)
                                ? "text-yellow-400 fill-current"
                                : "text-gray-300 dark:text-gray-600"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {product.rating} ({product.reviews} reviews)
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                    {product.description}
                  </p>

                  {/* Features */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      {t("key_features") || "Key Features:"}
                    </h4>
                    <div className="grid grid-cols-2 gap-1">
                      {product.features.slice(0, 4).map((feature, index) => (
                        <div key={index} className="flex items-center text-xs text-gray-600 dark:text-gray-400">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></div>
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA Button */}
                  <a
                    href={product.affiliateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full"
                  >
                    <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center gap-2">
                      {t("view_on_amazon") || "View on Amazon"}
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {t("no_resources_title") || "No resources found"}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
              {t("no_resources_description") || "Try adjusting your search terms or filters to find the resources you're looking for."}
            </p>
          </div>
        )}

        {/* Disclaimer */}
        <div className="mt-12 p-6 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
          <h3 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
            {t("affiliate_disclaimer_title") || "Affiliate Disclosure"}
          </h3>
          <p className="text-sm text-yellow-700 dark:text-yellow-300">
            {t("affiliate_disclaimer_text") || 
             "Some of the links on this page are affiliate links. This means that if you purchase through these links, we may earn a small commission at no extra cost to you. We only recommend resources that we believe will be helpful for your Bible study journey."}
          </p>
        </div>
      </div>
    </div>
  )
}

