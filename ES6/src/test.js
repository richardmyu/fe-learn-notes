const getList = (ary) => {
	if (!ary || !Array.isArray(ary)) {
		return []
	}
	return [...ary]
}
