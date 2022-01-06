import React, { useState, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'

import { toast } from 'react-toastify'

import {
	createPost,
	fetchPostById,
	updatePost,
} from '../redux/post/post.actions'

import Editor from 'ckeditor5-custom-build/build/ckeditor'
import { CKEditor } from '@ckeditor/ckeditor5-react'

import Button from '../components/Button'
import Helmet from '../components/Helmet'

const ModifyPostPage = ({ isUpdatePost }) => {
	const dispatch = useDispatch()

	const history = useHistory()

	const inputFileRef = useRef()

	const { id } = useParams()

	const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')
	const [content, setContent] = useState('')
	const [type, setType] = useState('')
	const [category, setCategory] = useState('')
	const [subject, setSubject] = useState('')
	const [keywords, setKeywords] = useState('')
	const [thumbnail, setThumbnail] = useState('')
	const [definition, setDefinition] = useState('')

	const { categories, subjects, types, post } = useSelector(
		({ category, subject, type, post }) => ({
			categories: category.categories,
			subjects: subject.subjects,
			types: type.types,
			post: post.post,
		})
	)

	const resetForm = () => {
		if (isUpdatePost) {
			if (Object.keys(post).length > 0) {
				setTitle(post.title)
				setDescription(post.description)
				setDefinition(post.definition)
				setThumbnail(post.thumbnail.url)
				setContent(post.content)
				setType(post.type._id)
				setKeywords(post.keywords.join(', '))
				setCategory(post.category._id)
				setSubject(post.subject._id)
				console.log('not go reset')
			}
		} else {
			setTitle('')
			setDescription('')
			setDefinition('')
			setContent('')
			setType('')
			setThumbnail('')
			setKeywords('')
			setCategory('')
			setSubject('')
		}
		console.log({ isUpdatePost })
	}

	const onChangeThumbnail = (e) => {
		const file = e.target.files[0]
		const reader = new FileReader()
		reader.addEventListener(
			'load',
			function () {
				setThumbnail(reader.result)
			},
			false
		)
		if (file) {
			reader.readAsDataURL(file)
		} else {
			console.log('eror')
		}
	}

	const submitForm = () => {
		if (
			title &&
			description &&
			thumbnail &&
			content &&
			type &&
			category &&
			subject
		) {
			if (!isUpdatePost) {
				dispatch(
					createPost(
						{
							title,
							description,
							thumbnail,
							content,
							type,
							definition,
							category,
							subject,
							keywords: keywords.split(',').map((item) => item.trim()),
						},
						() => history.push(`/manage/post`)
					)
				)
			} else {
				dispatch(
					updatePost(
						{
							_id: post._id,
							title,
							description,
							definition,
							thumbnail,
							content,
							type,
							category,
							subject,
							keywords: keywords.split(',').map((item) => item.trim()),
							oldThumbnail: post.thumbnail,
						},
						() => history.push(`/post/detail/${id}`)
					)
				)
			}
		} else {
			toast.error('Nhập đầy đủ dữ liệu bắt buộc')
		}
	}

	useEffect(() => {
		if (!isUpdatePost) {
			return resetForm()
		}
		console.log({ isUpdatePost })
		if (Object.keys(post).length > 0) {
			setTitle(post.title)
			setDescription(post.description)
			setDefinition(post.definition)
			setThumbnail(post.thumbnail.url)
			setContent(post.content)
			setType(post.type._id)
			setKeywords(post.keywords.join(', '))
			setCategory(post.category._id)
			setSubject(post.subject._id)
		}
	}, [post, isUpdatePost])

	useEffect(() => {
		if (isUpdatePost && id) {
			window.scrollTo(0, 0)
			dispatch(fetchPostById(id))
		}
	}, [])

	return (
		<Helmet title='Tạo bài mới'>
			<div className='modify-post'>
				<div className='modify-post__form-group'>
					<label
						htmlFor='modify-post__name'
						className='modify-post__title'
					>
						Nhập tên bài viết <i>*</i>
					</label>
					<input
						type='text'
						spellCheck={false}
						id='modify-post__title'
						className='modify-post__input'
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						placeholder='Nhập tên bài viết'
					/>
				</div>
				<div className='modify-post__form-group'>
					<label htmlFor='' className='modify-post__title'>
						Nhập mô tả <i>*</i>
					</label>
					<textarea
						rows='6'
						spellCheck='false'
						className='modify-post__text-area'
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						placeholder='Nhập mô tả'
					/>
				</div>
				<div className='modify-post__form-group'>
					<label htmlFor='' className='modify-post__title'>
						Upload ảnh <i>*</i>
					</label>
					<input
						ref={inputFileRef}
						type='file'
						className='modify-post__input'
						onChange={onChangeThumbnail}
						placeholder='Nhập tên bài viết'
					/>
					{thumbnail && (
						<img
							src={thumbnail}
							alt='Image preview'
							className='modify-post__image-preview'
						/>
					)}
				</div>
				<div className='modify-post__form-group'>
					<label htmlFor='' className='modify-post__title'>
						Chọn loại <i>*</i>
					</label>
					<select
						className='modify-post__select'
						value={type}
						onChange={(e) => setType(e.target.value)}
					>
						<option value=''>-- Nhập loại --</option>
						{types &&
							types.length > 0 &&
							types.map((item) => (
								<option key={item._id} value={item._id}>
									{item.name}
								</option>
							))}
					</select>
				</div>
				<div className='modify-post__form-group'>
					<label htmlFor='' className='modify-post__title'>
						Chọn danh mục <i>*</i>
					</label>
					<select
						className='modify-post__select'
						value={category}
						onChange={(e) => setCategory(e.target.value)}
					>
						<option value=''>-- Chọn danh mục --</option>
						{categories &&
							categories.length > 0 &&
							categories.map((item) => (
								<option key={item._id} value={item._id}>
									{item.name}
								</option>
							))}
					</select>
					<div className='modify-post__form-group'>
						<label htmlFor='' className='modify-post__title'>
							Chọn chủ đề <i>*</i>
						</label>
						<select
							className='modify-post__select'
							value={subject}
							onChange={(e) => setSubject(e.target.value)}
						>
							<option value=''>-- Chọn chủ đề --</option>
							{subjects &&
								subjects.length > 0 &&
								subjects.map((item) =>
									item.category._id === category ? (
										<option key={item._id} value={item._id}>
											{item.name}
										</option>
									) : null
								)}
						</select>
					</div>
				</div>
				<div className='modify-post__form-group'>
					<label htmlFor='' className='modify-post__title'>
						Nhập định nghĩa<i>*</i>
					</label>
					<textarea
						rows='6'
						spellCheck='false'
						className='modify-post__text-area'
						value={definition}
						onChange={(e) => setDefinition(e.target.value)}
						placeholder='Nhập định nghĩa cho chatbot'
					/>
				</div>
				<div className='modify-post__form-group'>
					<label htmlFor='' className='modify-post__title'>
						Nhập nội dung <i>*</i>
					</label>
					<CKEditor
						editor={Editor}
						config={editorConfiguration}
						data={content}
						onReady={(editor) => {
							editor?.ui
								.getEditableElement()
								.parentElement.insertBefore(
									editor?.ui.view.toolbar.element,
									editor?.ui.getEditableElement()
								)
						}}
						onChange={(event, editor) => {
							const data = editor.getData()
							setContent(data)
						}}
						onBlur={(event, editor) => {
							console.log('Blur.', editor)
						}}
						onFocus={(event, editor) => {
							console.log('Focus.', editor)
						}}
					/>
				</div>

				<div className='modify-post__form-group'>
					<label htmlFor='' className='modify-post__title'>
						Nhập từ khóa (mỗi từ khóa cách nhau bởi dấu ',')
					</label>
					<input
						type='text'
						spellCheck={false}
						className='modify-post__input'
						value={keywords}
						onChange={(e) => setKeywords(e.target.value)}
						placeholder='Nhập từ khóa'
					/>
				</div>
				<div className='modify-post__btn-group'>
					<Button className='modify-post__btn' onClick={resetForm}>
						Reset
					</Button>
					<Button className='modify-post__btn' onClick={submitForm}>
						{isUpdatePost ? 'Sửa bài' : 'Tạo bài'}
					</Button>
				</div>
			</div>
		</Helmet>
	)
}

export default ModifyPostPage

const editorConfiguration = {
	toolbar: {
		items: [
			'heading',
			'|',
			'bold',
			'italic',
			'underline',
			'strikethrough',
			'|',
			'fontSize',
			'fontFamily',
			'fontColor',
			'fontBackgroundColor',
			'|',
			'alignment:left',
			'alignment:center',
			'alignment:right',
			'alignment:justify',
			'|',
			'link',
			'bulletedList',
			'numberedList',
			'|',
			'indent',
			'outdent',
			'|',
			'uploadImage',
			'blockQuote',
			'undo',
			'redo',
			'codeBlock',
		],
		shouldNotGroupWhenFull: true,
	},
	ckfinder: { uploadUrl: '/img/upload' },
}
