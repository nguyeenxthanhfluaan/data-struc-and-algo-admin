function search(arr, keyword) {
	if (Array.isArray(arr) && arr.length <= 0) {
		return null
	}

	// Lọc mảng theo keyword, lấy những kết quả mà
	// keyword của post có chứa tất cả những từ trong chuỗi tìm kiếm
	if (keyword) {
		const keywords = keyword.split(' ')

		console.log(keywords)

		if (Array.isArray(keywords) && keywords.length > 0) {
			arr = arr.filter((item) => {
				console.log({ item })

				return keywords.every((item1) => {
					console.log({ item1 })
					console.log({ keyword: item.keywords })
					console.log({ true: item.keywords.includes(item1.toString()) })

					return (
						item.title.includes(item1.toString()) ||
						item.keywords.includes(item1.toString())
					)
				})
			})
		}
	}
	return arr
}

module.exports = search
