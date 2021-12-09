import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useLocation } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

import { fetchPosts } from '../redux/post/post.actions'

import Button from '../components/Button'
import Marginer from '../components/Marginer'
import List from '../components/List'
import Helmet from '../components/Helmet'

const SearchPage = () => {
	const dispatch = useDispatch()

	const { posts, categories, subjects, types } = useSelector(
		({ post, category, subject, type }) => ({
			posts: post.posts,
			categories: category.categories,
			subjects: subject.subjects,
			types: type.types,
		})
	)

	const searchParams = new URLSearchParams(useLocation())

	const [title, setTitle] = useState('')

	const [keyword, setKeyword] = useState('')
	const [category, setCategory] = useState('')
	const [subject, setSubject] = useState('')
	const [type, setType] = useState('')
	const [sortBy, setSortBy] = useState('')

	useEffect(() => {
		if (searchParams.get('category'))
			setCategory(searchParams.get('category'))
		if (searchParams.get('subject')) setSubject(searchParams.get('subject'))

		dispatch(
			fetchPosts({
				type: searchParams.get('type') || null,
				category: searchParams.get('category') || null,
				subject: searchParams.get('subject') || null,
			})
		)
	}, [])

	useEffect(() => {
		setTitle(keyword)
	}, [posts])

	const handleChangeCategory = (e) => {
		setCategory(e.target.value)
		setSubject('')
	}

	const search = (e) => {
		e.preventDefault()
		console.log({ type, keyword, category, subject, sortBy })
		dispatch(fetchPosts({ type, keyword, category, subject, sortBy }))
	}

	return (
		<Helmet title='Tìm kiếm'>
			<form className='search'>
				<input
					type='text'
					className='search__input'
					placeholder='Nhập từ khóa'
					value={keyword}
					onChange={(e) => setKeyword(e.target.value)}
				/>
				<Marginer margin={'30px'} />
				<div className='search__header'>
					<div className='search__filter__group'>
						<label
							htmlFor='select-type'
							className='search__filter__label'
						>
							Chọn loại
						</label>
						<select
							id='select-type'
							className='search__filter__select'
							value={type}
							onChange={(e) => setType(e.target.value)}
						>
							<option value=''> -- Chọn tất cả -- </option>
							{types &&
								types.length > 0 &&
								types.map((item) => (
									<option key={item._id} value={item._id}>
										{item.name}
									</option>
								))}
						</select>
					</div>

					<div className='search__filter__group'>
						<label
							htmlFor='select-category'
							className='search__filter__label'
						>
							Chọn danh mục
						</label>
						<select
							id='select-category'
							className='search__filter__select'
							value={category}
							onChange={handleChangeCategory}
						>
							<option value=''> -- Chọn tất cả -- </option>
							{categories &&
								categories.length > 0 &&
								categories.map((item) => (
									<option key={item._id} value={item._id}>
										{item.name}
									</option>
								))}
						</select>
					</div>

					<div className='search__filter__group'>
						<label
							htmlFor='select-subject'
							className='search__filter__label'
						>
							Chọn chủ đề
						</label>
						<select
							id='select-subject'
							className='search__filter__select'
							value={subject}
							onChange={(e) => setSubject(e.target.value)}
						>
							<option value=''> -- Chọn tất cả -- </option>
							{subjects &&
								subjects.length > 0 &&
								subjects
									.filter((item) => item.category._id === category)
									.map((item) => (
										<option key={item._id} value={item._id}>
											{item.name}
										</option>
									))}
						</select>
					</div>

					<div className='search__filter__group'>
						<label
							htmlFor='select-subject'
							className='search__filter__label'
						>
							Sắp xếp theo
						</label>
						<select
							id='select-subject'
							className='search__filter__select'
							value={sortBy}
							onChange={(e) => setSortBy(e.target.value)}
						>
							<option value=''> -- Không -- </option>
							<option value='newest'> -- Mới nhất -- </option>
							<option value='oldest'> -- Cũ nhất -- </option>
							<option value='relevant'> -- Liên quan nhất -- </option>
							<option value='mostViewed'> -- Xem nhiều nhất -- </option>
						</select>
					</div>
				</div>

				<Marginer margin={'30px'} />

				<Button onClick={search}>Áp dụng</Button>

				<Marginer margin={'50px'} />

				<h6 className='search__header__text'>
					Tìm kiếm cho <q>{title}</q>
				</h6>

				<Marginer margin={'50px'} />

				{posts && posts.length > 0 && <List data={posts} />}
				{posts && posts.length === 0 && <h5>Không tìm thấy nội dung</h5>}
			</form>
		</Helmet>
	)
}

export default SearchPage
