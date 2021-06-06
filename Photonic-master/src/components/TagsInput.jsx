
import React, {useState} from 'react'

const TagsInput = (props) => {

    const [tags, setTags] = useState(props.tags);
	const removeTags = indexToRemove => {
		setTags([...tags.filter((_, index) => index !== indexToRemove)]);
	};
	const addTags = event => {
		if (event.target.value !== "") {
			setTags([...tags, event.target.value]);
			//props.tags=[...tags, event.target.value];
			event.target.value = "";
		}
	};
	
	return (
		<div className="tags-input">
			<ul id="tags">
				{tags.map((tag, index) => (
					<button key={index} className="tag-btn">
						<span className='tag-title'>{tag}</span>
						<span className='tag-close-icon'
							onClick={() => removeTags(index)}
						>
							x
						</span>
					</button>
				))}
			</ul>

			<input
				type="text"
				onKeyUp={event => {event.preventDefault(); event.key === "Enter" ? addTags(event) : null}}
				placeholder="Press enter to add tags" 
				className="tags-input-field"
			/>

		
		</div>
	);
}

export default TagsInput


