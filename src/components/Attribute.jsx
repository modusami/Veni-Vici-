const Attribute = ({ title, data, onClickToBanList }) => {
	return (
		<div className="mx-auto mt-5">
			<h3 className="text-center font-bold mb-3 text-[1.2rem]">{title}</h3>
			<p
				onClick={(e) => onClickToBanList(e, title)}
				className="p-5 h-[80px] flex justify-center text-center shadow-md shadow-black rounded-md active:bg-slate-200 hover:cursor-pointer w-[200px]"
			>
				{data}
			</p>
		</div>
	);
};

export default Attribute;
