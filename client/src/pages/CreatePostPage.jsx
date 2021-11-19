import React, { useState, useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { toast } from 'react-toastify'

import { createPost } from '../redux/post/post.actions'

import Button from '../components/Button'

const CreatePostPage = () => {
	const dispatch = useDispatch()

	const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')
	const [content, setContent] = useState('')
	const [type, setType] = useState('')
	const [postCategories, setPostCategories] = useState([{ category: '' }])
	const [postSubjects, setPostSubjects] = useState([{ subject: '' }])
	const [keywords, setKeywords] = useState('')

	const { categories, subjects, types } = useSelector(
		({ category, subject, type }) => ({
			categories: category.categories,
			subjects: subject.subjects,
			types: type.types
		})
	)

	useEffect(() => {
		let postCategoriesTemp = []

		postSubjects.map((item) => {
			const temp = subjects.find((item1) => item1._id === item.subject)
			console.log({ temp })
			if (temp) {
				const categoryId = temp.category._id
				if (
					!postCategoriesTemp.some(
						(item2) => item2.category === categoryId
					)
				) {
					postCategoriesTemp.push({ category: categoryId })
				}
			}
		})
		postCategoriesTemp.length > 0
			? setPostCategories(postCategoriesTemp)
			: setPostCategories([{ category: '' }])
	}, [postSubjects])

	const handleChangeSubject = (event, index) => {
		if (event.target.value === '') {
			postSubjects.splice(index, 1)
			return setPostSubjects([...postSubjects])
		}

		postSubjects[index].subject = event.target.value
		if (index === postSubjects.length - 1) {
			setPostSubjects([
				...postSubjects,
				{
					subject: ''
				}
			])
		} else {
			setPostSubjects([...postSubjects])
		}
	}

	const resetForm = useCallback(() => {
		setTitle('')
		setDescription('')
		setContent('')
		setType('')
		setKeywords('')
		setPostCategories([{ category: '' }])
		setPostSubjects([{ subject: '' }])
	}, [])

	const submitForm = () => {
		const postCategoriesFilter = postCategories.filter(
			(item) => item.category !== ''
		)
		const postSubjectsFilter = postSubjects.filter(
			(item) => item.subject !== ''
		)

		if (
			title &&
			description &&
			content &&
			type &&
			postCategoriesFilter.length > 0 &&
			postSubjectsFilter.length > 0
		) {
			dispatch(
				createPost({
					title,
					description,
					content,
					type,
					categories: postCategoriesFilter,
					subjects: postSubjectsFilter,
					keywords: keywords.split(',').map((item) => item.trim())
				})
			)
		} else {
			toast.error('Nhập đầy đủ dữ liệu bắt buộc', {
				position: 'top-right',
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				style: { fontSize: '1.6rem' }
			})
		}
	}

	return (
		<div className='create-post'>
			<div className='create-post__form-group'>
				<label htmlFor='create-post__name' className='create-post__title'>
					Nhập tên bài đăng <i>*</i>
				</label>
				<input
					type='text'
					id='create-post__title'
					className='create-post__input'
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					placeholder='Nhập tên bài đăng'
				/>
			</div>
			<div className='create-post__form-group'>
				<label htmlFor='' className='create-post__title'>
					Nhập mô tả <i>*</i>
				</label>
				<input
					type='text'
					className='create-post__input'
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					placeholder='Nhập tên bài đăng'
				/>
			</div>
			<div className='create-post__form-group'>
				<label htmlFor='' className='create-post__title'>
					Nhập loại <i>*</i>
				</label>
				<select
					className='create-post__select'
					value={type}
					onChange={(e) => setType(e.target.value)}
				>
					<option value=''>-- Nhập --</option>
					{types &&
						types.length > 0 &&
						types.map((item) => (
							<option key={item._id} value={item._id}>
								{item.name}
							</option>
						))}
				</select>
			</div>
			<div className='create-post__form-group'>
				<label htmlFor='' className='create-post__title'>
					Nhập chủ đề <i>*</i>
				</label>
				{postSubjects.map((item, index) => (
					<select
						className='create-post__select'
						key={index}
						value={item.subject}
						onChange={(e) => handleChangeSubject(e, index)}
					>
						<option value=''>-- Nhập --</option>
						{subjects &&
							subjects.length > 0 &&
							subjects.map((item) => (
								<option key={`${index}${item._id}`} value={item._id}>
									{item.name}
								</option>
							))}
					</select>
				))}
			</div>
			<div className='create-post__form-group'>
				<label htmlFor='' className='create-post__title'>
					Nhập dạng <i>*</i>
				</label>
				{postCategories.map((item, index) => (
					<select
						className='create-post__select'
						key={index}
						disabled
						value={item.category}
					>
						<option value=''>-- Chọn chủ đề --</option>
						{categories &&
							categories.length > 0 &&
							categories.map((item) => (
								<option key={`${index}${item._id}`} value={item._id}>
									{item.name}
								</option>
							))}
					</select>
				))}
			</div>
			<div className='create-post__form-group'>
				<label htmlFor='' className='create-post__title'>
					Nhập nội dung <i>*</i>
				</label>
				<CKEditor
					editor={ClassicEditor}
					data={content}
					onChange={(event, editor) => {
						const data = editor.getData()
						setContent(data)
					}}
					config={{
						ckfinder: { uploadUrl: '/api/img/upload' }
					}}
				/>
			</div>
			<div className='create-post__form-group'>
				<label htmlFor='' className='create-post__title'>
					Nhập từ khóa (mỗi từ khóa cách nhau bởi dấu ',')
				</label>
				<input
					type='text'
					className='create-post__input'
					value={keywords}
					onChange={(e) => setKeywords(e.target.value)}
					placeholder='Nhập từ khóa'
				/>
			</div>
			<div className='create-post__btn-group'>
				<Button className='create-post__btn' onClick={resetForm}>
					Reset
				</Button>
				<Button className='create-post__btn' onClick={submitForm}>
					Tạo bài
				</Button>
			</div>
		</div>
	)
}

export default CreatePostPage
