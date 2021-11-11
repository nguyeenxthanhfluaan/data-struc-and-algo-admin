function search(arr, { category, type, keyword }) {
	if (Array.isArray(arr) && arr.length <= 0) {
		return null
	}

	// Lọc mảng theo category
	if (category) {
		arr = arr.filter((item) => item.categories.includes(category))
	}
	// Lọc mảng theo type
	if (type) {
		arr = arr.filter((item) => item.types.includes(type))
	}
	// Lọc mảng theo keyword, lấy những kết quả mà
	// title có chứa tất cả những từ trong chuỗi tìm kiếm
	if (keyword) {
		const keywords = keyword.split(' ')
		if (Array.isArray(keywords) && keywords.length > 0) {
			arr = arr.filter((item) => {
				console.log({ item })
				console.log(keywords.every((item1) => item.title.includes(item1)))
				return keywords.every((item1) => item.title.includes(item1))
			})
		}
	}
	return arr
}

module.exports = search
