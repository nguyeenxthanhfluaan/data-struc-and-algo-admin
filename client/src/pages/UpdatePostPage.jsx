import React, { useState, useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { createPost, updatePost } from '../redux/post/post.actions'

import { CKEditor } from '@ckeditor/ckeditor5-react'
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document'
import { toast } from 'react-toastify'

import Button from '../components/Button'

const CreatePostPage = () => {
	const dispatch = useDispatch()
	const history = useHistory()

	const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')
	const [content, setContent] = useState('')
	const [type, setType] = useState('')
	const [postCategories, setPostCategories] = useState([{ category: '' }])
	const [postSubjects, setPostSubjects] = useState([{ subject: '' }])
	const [keywords, setKeywords] = useState('')

	const { categories, subjects, types, post } = useSelector(
		({ category, subject, type, post }) => ({
			categories: category.categories,
			subjects: subject.subjects,
			types: type.types,
			post: post.post,
		})
	)

	useEffect(() => {
		if (!post || Object.keys(post).length <= 0) {
			return history.push('/')
		}

		setTitle(post.title)
		setDescription(post.description)
		setContent(post.content)
		setType(post.type._id)
		setPostCategories(
			post.categories.map((item) => ({ category: item.category._id }))
		)
		setPostSubjects([
			...post.subjects.map((item) => ({ subject: item.subject._id })),
			{
				subject: '',
			},
		])
		setKeywords(post.keywords.join(','))
	}, [post])

	console.log({ postCategories })

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
					subject: '',
				},
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
				updatePost(
					{
						_id: post._id,
						title,
						description,
						content,
						type,
						categories: postCategoriesFilter,
						subjects: postSubjectsFilter,
						keywords: keywords.split(',').map((item) => item.trim()),
					},
					resetForm
				)
			)
		} else {
			toast.error('Nhập đầy đủ dữ liệu bắt buộc', {
				style: { fontSize: '1.6rem' },
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
					<option value=''>-- Chọn loại bài viết --</option>
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
						<option value=''>
							{index === postSubjects.length - 1
								? '-- Chọn chủ đề --'
								: '-- Hủy chủ đề này --'}
						</option>
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
					editor={DecoupledEditor}
					onReady={(editor) => {
						console.log('Editor is ready to use!', editor)
						editor.ui
							.getEditableElement()
							.parentElement.insertBefore(
								editor.ui.view.toolbar.element,
								editor.ui.getEditableElement()
							)
					}}
					data={content}
					onChange={(event, editor) => {
						const data = editor.getData()
						setContent(data)
					}}
					config={{
						ckfinder: { uploadUrl: '/img/upload' },
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
					Sữa bài
				</Button>
			</div>
		</div>
	)
}

export default CreatePostPage
