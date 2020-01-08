import {StyleSheet, Dimensions} from 'react-native';
let screenWidth = Dimensions.get('window').width;
let screenHeight = Dimensions.get('window').height;
let WidthPol = screenWidth/2 - 25
let WidthCol = (screenWidth-60) /3

const styles = StyleSheet.create({
  base: {
    backgroundColor: 'white',
    flex: 1,
  },
  white: {
    color: 'white',
  },
  space: {
    color: '#9BA4BF',
  },
  green: {
    color: '#2BAB5C',
  },
  link: {
    color: '#3967B2',
  },
  bggreen: {
    backgroundColor:'#2BAB5C',
    flex:1,
  },
  centercnt: {
    justifyContent:'center',
    alignItems:'center',
  },
  mb1: {
    marginBottom: 10,
  },
  mb: {
    marginBottom: 20,
  },
  mb3: {
    marginBottom: 30,
  },
  mb4: {
    marginBottom: 40,
  },
  h2: {
    fontSize: 32,
    fontWeight: '800',
  },
  h3: {
    fontSize: 28,
    fontWeight: '800',
  },
  tc:{
    textAlign:'center',
  },
  raz:{
    fontSize:60,
    color:'#2BAB5C',
    textAlign:'center',
  },
  h4: {
    fontSize: 25,
    fontWeight: '800',
  },
  btnSuccess: {
    backgroundColor: '#2BAB5C',
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  btnLink: {
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
   fw500: {
    fontWeight: '500',
  },
  fw600: {
    fontWeight: '600',
  },
  fw800: {
    fontWeight: '800',
  },
  p10: {
    fontSize: 10,
  },
  p11: {
    fontSize: 11,
  },
  p13: {
    fontSize: 13,
  },
  p12: {
    fontSize: 12,
  },
  p14: {
    fontSize: 14,
  },
  p16: {
    fontSize: 16,
  },
  p18: {
    fontSize: 18,
    fontWeight: '400',
  },
  p22: {
    fontSize: 22,
    fontWeight: '400',
  },
  p35: {
    fontSize: 35,
  },
  bBox: {
    padding: 20,
    width: screenWidth,
  },
  trImages:{
    height: screenWidth*0.6,
  },
  trVideo:{
    height: screenWidth*0.667,
  },
  uppText: {
    textTransform: 'uppercase',
  },
  topView: {
    top: -88,
    height: screenHeight + 25,
    justifyContent: 'flex-end',
  },
  trItem: {
    backgroundColor: 'white',
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 10,
    borderRadius: 15,
  },
  trItemDiss: {
    backgroundColor: '#f3f3f3',
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 10,
    borderRadius: 15,
  },
  trOpac: {
    opacity:0.6,
  },
  bgf3: {
    backgroundColor:'#f3f3f3',
  },
  trCont: {
    justifyContent: 'center',
  },
  inform: {
    flexDirection: 'row',
  },
  ll: {
    marginRight: 20,
  },
  iconInform: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  logoBox: {
    backgroundColor: 'white',
    height: 90,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  logo: {
    height: 30,
    width: 128,
    marginBottom: 20,
  },
  programBg: {
    flex: 1,
    justifyContent: 'flex-end',
    overflow: 'hidden',
    borderRadius: 15,
    color: 'white',
    padding: 20,
  },
  navBar: {
    backgroundColor: 'transparent',
  },
  scrollBox: {
    flex: 1,
  },
  foot: {
    backgroundColor: 'white',
    height: 60,
  },
  tpbar: {
    height:45, 
    backgroundColor:'#fff', 
    flexDirection:'row',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: {height: 0,width: 0},
  },
  tpbarItem: {
    flex:1, 
    flexDirection:'row', 
    alignItems:'center', 
    justifyContent:'center',
  },
  setItem: {
    flexDirection:'row', 
    marginBottom:20,
  },
  setImag: {
    height:80, 
    width:110, 
    borderRadius:8,
  },
  setInfo: {
    flex:1, 
    paddingLeft:15, 
    justifyContent:'center',
  },
  setInfoH: {
    fontSize:16, 
    fontWeight:'500', 
    marginBottom:5,
  },
  setInfoP: {
    fontSize:14, 
    fontWeight:'300', 
    color:'#767676',
  },
  kvadrat:{
    height:24, 
    width:24, 
    borderRadius: 5,
    justifyContent:'center', 
    alignItems:'center',
  },
  week:{
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 20,
  },
  profileList:{
    justifyContent:'space-between',
    flexDirection:'row', 
    height:60, 
    alignItems:'center', 
    borderBottomWidth:1,
    borderBottomColor:'#9BA4BF',
  },
  storyItem:{
    flex:1, 
    marginRight:1,
    height:4, 
    backgroundColor:'#2BAB5C',
  },
  storyItemDone:{
    flex:1, 
    marginRight:1,
    height:4, 
    backgroundColor:'#D3D9E3',
  },

  boxSlide: {
    flex: 1,
    width: screenWidth,
    justifyContent:'flex-end',
    padding: 20,
  },
  listItem: {
    height:55, 
    borderBottomWidth:1, 
    borderColor:'white', 
    flexDirection: 'row', 
    alignItems:'center'
  },
  Flex: {
    flex:1,
  },
  listText: {
    fontSize:18, 
    fontWeight:'600', 
    color:'white'
  },
  buttonSuccess: {
    marginTop: 15,
  },
  buttonNext: {
    marginBottom: 20,
    fontSize: 25,
    fontWeight: '600',
  },
  center: {
    alignItems: 'center',
    padding: 20,
  },
  btnChoise: {
    height:55, 
    borderRadius: 10,
    borderWidth:1,
    borderColor: 'white',
    width: WidthPol,
    marginTop:10,
    padding:5,
    alignItems:'center',
    justifyContent:'center',
  },
  btnSex: {
    height:WidthPol, 
    borderRadius: 10,
    borderWidth:1,
    borderColor: 'white',
    width: WidthPol,
    marginTop:10,
    padding:5,
    alignItems:'center',
    justifyContent:'center',
  },
  btnActive: {
    backgroundColor:'white',
  },
  textActive: {
    color: '#2BAB5C',
  },
  btnChoiseText: {
    color:'#fff',
    fontSize: 16,
    textAlign:'center',
  },
  justify: {
    flex: 1,
    justifyContent: 'center',
  },
  otstup: {
    height:100,
  },
  shag: {
    fontSize:24,
    marginBottom:10,
    color: 'white',
  },
  absolute: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    padding: 20,
  },
  level_item: {
    flexDirection:'row', 
    flexWrap:'wrap', 
    marginBottom:20,
  },
  level_item_text: {
    color:'#fff', 
    fontSize:24,
    marginBottom:5,
  },
  level_item_text_p: {
    color:'#fff', 
    fontSize:16,
  },
  price_item: {
    width:WidthCol,
    backgroundColor:'#9BA4BF',
    borderRadius:10,
    position:'relative',
    alignItems: 'center',
  },
  price_item_active: {
    backgroundColor:'#2BAB5C',
  },
  price_box: {
    paddingVertical:20, 
    alignItems:'center', 
    justifyContent:'center',
  },
  prise_items: {
    flexDirection:'row', 
    flexWrap:'wrap', 
    justifyContent: 'space-between', 
    padding:20, 
    flex:1, 
    alignItems:'center',
  },
  price_text: {
    fontSize:30, 
    fontWeight:'800', 
    color:'#fff',
  },
  price_op: {
    opacity: 0.7,
  },
  saleimg: {
    height: screenWidth * 0.7,
    width: '100%',
  },
  regimg: {
    height: screenWidth * 0.8,
    width: '100%',
  },
text_right: {
  textAlign: 'right',
},
home_day: {
  fontSize:100,
  fontWeight:'800',
  color:'#2BAC5C',
},
home_task: {
  fontSize:16,
  fontWeight:'600',
  marginBottom:20,
},
trening_box: {
  width: WidthPol,
  height:WidthPol/0.65,
  borderRadius:15,
  overflow:'hidden',
  position:'relative',
},
tr_box_bg: {
  backgroundColor:'#00000071', 
},
trending_box_done: {
  flex:1,
  padding:10,
  justifyContent:'flex-end',
},
wat: {
  width: WidthPol,
  justifyContent:'flex-end', 
  backgroundColor:'#2BAB5C', 
  overflow:'hidden', 
  borderRadius:15,
  height:WidthPol/0.65,
},
home_header: {
  alignItems: 'center',
  justifyContent: 'center',
  padding:20,
},
home_task_box: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal:20,
},
rowwer: {
  flexDirection: 'row',
  marginTop:20,
},
text_decor: {
  textDecorationLine: "line-through",
  textDecorationStyle: "solid",
  textDecorationColor: "#fff"
},
day_day: {
  fontSize:14, 
  color:'#9BA4BF',
  marginBottom:3,
},
day_grey: {
  color:'#9BA4BF',
},
day_number: {
  fontSize:16, 
  fontWeight:'600'
},
day_number_active: {
  color: '#2BAB5C',
},
tara: {
  paddingVertical:10, 
  paddingHorizontal:10, 
  borderRadius:5, 
  marginLeft:20,
},
taraActive: {
  borderWidth:1, 
  borderColor:'white',
},

content: {
  backgroundColor: 'white',
  padding: 20,
  justifyContent: 'center',
  borderRadius: 15,
  borderColor: 'rgba(0, 0, 0, 0.1)',
},
contentTitle: {
  fontSize: 30,
  textAlign:'center',
},
ww: {
  width:'100%',
},
pikerItem: {
  fontSize:40, 
  color:'#747E9D', 
  fontWeight:'400',
},
pikers: {
  height: 200, 
  width: 200, 
  margin:40,
},
modal_content: {
  backgroundColor: 'white', 
  height: '90%', 
  borderTopLeftRadius:15, 
  borderTopRightRadius:15,
},
modal_header: {
  padding:20,
  flexDirection:'row', 
  justifyContent:'space-between',
},
modal_header_title: {
  fontSize:16, 
  fontWeight:'600',
},


});

export default styles;