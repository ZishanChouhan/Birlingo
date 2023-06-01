import React from 'react';
import {View, Text, Modal, Image, TouchableOpacity, Dimensions, FlatList,} from 'react-native'
import font from '../../Theme/font';
import Entypo from "react-native-vector-icons/Entypo"

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const CustomSearchableDropDown = ({ visible, customSearchDropDownTitle, searchData, handleSelectedValueOfCustomSearchDropDown, onClose }) => {

	const loadFlatListData = (item, index) => {
		console.log("item", item);
		return (
			<TouchableOpacity style={{ height: windowHeight / 15, justifyContent: 'center', paddingLeft: 16, backgroundColor: 'white' }}
				onPress={() => {
					handleSelectedValueOfCustomSearchDropDown(item)
					onClose()
				}}>
				<Text style={{ color: 'black',fontFamily:font.Roboto_Medium,textTransform:"capitalize" }}>{item.label}</Text>
			</TouchableOpacity>
		)
	}

	return (
		<Modal
			style={{ flex: 1, }}
			transparent={true}
			visible={visible}
			onRequestClose={() => onClose()}
		>
			<View style={{ flex: 1, alignItems: 'center', backgroundColor: 'rgba(40, 40, 43,.1)' }} >							
				<View style={{ height: Dimensions.get("screen").height, width: Dimensions.get("screen").width, paddingTop: 40, backgroundColor: 'white',}} >
					<View 
						style={{ 
							flex: 0.1, 
							flexDirection: 'row', 
							alignItems: 'center', 
							justifyContent: 'space-between', 
							paddingHorizontal: 10, 
							// backgroundColor: '#F8AE39',
							borderBottomWidth: 1,
							paddingBottom: 8 
						}}>
						
						<TouchableOpacity 
							style={{
								width: '100%', 
								justifyContent: 'flex-end', 
								paddingLeft: 5, 								
							}}
							onPress={() => onClose()}
						>
							<Entypo name={"cross"} size={25}/>
						</TouchableOpacity>
					</View>

					<FlatList
						style={{}}
						data={searchData}
						renderItem={({ item, index }) => loadFlatListData(item, index)}
					/>

				</View>
			</View>
		</Modal>
	)
}


export default CustomSearchableDropDown;