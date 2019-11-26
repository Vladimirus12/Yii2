//TODO create URL constructor
class UrlParams {
	constructor() {
		this.filters = {};
		this.fields = [];
		this.expand = [];
		this.sort = [];
	}

	addFilters(filters = {}) {
		this.filters = filters;
		return this;
	}

	getUrl() {
		let strUrl = "?";
		strUrl += this.getFilters();
		return strUrl;
	};

	getFilters() {
		if (!Object.keys(this.filters).length) {
			return "";
		}
		const strFilters = JSON.stringify(this.filters);
		return `filter=${strFilters}&`;
	};
}

