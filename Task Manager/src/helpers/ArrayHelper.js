import { Map, OrderedMap } from "immutable";

export class ArrayHelper {
	static extractIdToObjectKey = (arr) => {
		const mapId = {};
		const arrLen = arr.length;
		for (let i = 0; i < arrLen; i++) {
			mapId[arr[i].id] = i;
		}
		return mapId;
	};

	static findIndexById = (arr, id) => {
		return arr.findIndex((item) => item.id === id);
	};

	static findObjectById = (arr, id) => {
		return arr.find((item) => item.id === id);
	};

	static replaceByIndex = (arr, index, element) => {
		const start = arr.slice(0, index);
		const end = arr.slice(index + 1);
		return [...start, element, ...end]
	};

	static replaceObjectById = (arr, obj) => {
		const index = ArrayHelper.findIndexById(arr, obj.id);
		return ArrayHelper.replaceByIndex(arr, index, obj);
	};

	static replaceArrayObjects = (arr, arrObj) => {
		let newArr = Array.from(arr);
		const arrLen = arrObj.length;
		for (let i = 0; i < arrLen; i++) {
			newArr = ArrayHelper.replaceObjectById(newArr, arrObj[i]);
		}
		return newArr;
	};

	static toOrderMap = (arr, DataRecord) => {
		return this.toMap(arr, DataRecord, true);
	};

	static toMap = (arr, DataRecord, order = false) => {
		return arr.reduce(
			(acc, item) => acc.set(item.id, DataRecord ? new DataRecord(item) : item),
			order ? new OrderedMap({}) : new Map({})
		);
	};

	static toArrayRecords = (arr, DataRecord) => {
		return arr.map(
			(item) => DataRecord ? new DataRecord(item) : item
		)
	};
}
