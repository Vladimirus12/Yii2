import { ArrayHelper } from "../helpers/ArrayHelper";

export class DragDrop {
	static reorder = (list, startIndex, endIndex) => {
		const result = Array.from(list);
		const [removed] = result.splice(startIndex, 1);
		result.splice(endIndex, 0, removed);

		return result;
	};

	static move = (source, destination, droppableSource, droppableDestination) => {
		const sourceClone = Array.from(source);
		const destClone = Array.from(destination);
		const [removed] = sourceClone.splice(droppableSource.index, 1);

		destClone.splice(droppableDestination.index, 0, removed);

		return {
			source: sourceClone,
			destination: destClone,
		};
	};

	static fillNewIndexes = (list, keyIndex) => {
		const changedRecords = [];
		list.forEach((record, index) => {
			if (record.get(keyIndex) === index) {
				return;
			}
			changedRecords.push(record.set(keyIndex, index));
		});
		return changedRecords;
	};

	static reorderImmutable = (orderMap, keyIndex, startIndex, endIndex) => {
		const newArray = this.reorder(orderMap.valueSeq().toArray(), startIndex, endIndex);
		const changedRecords = this.fillNewIndexes(newArray, keyIndex);

		return {
			newMap: ArrayHelper.toOrderMap(newArray),
			changedRecords,
		}
	};

	static moveImmutable = (sourceOrderMap, destinationOrderMap, keyIndex, startIndex, endIndex) => {
		const newData = this.move(
			sourceOrderMap.valueSeq().toArray(),
			destinationOrderMap.valueSeq().toArray(),
			startIndex,
			endIndex
		);
		const changedRecords = this.fillNewIndexes(newData.destination, keyIndex);

		return {
			source: ArrayHelper.toOrderMap(newData.source),
			destination: ArrayHelper.toOrderMap(newData.destination),
			changedRecords,
		}
	};

}
