import { setStatusBarNetworkActivityIndicatorVisible, StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Button, View, Modal, Text,ImageBackground,TouchableOpacity,Image } from "react-native";
import Camera from "./Camera";

export default function pre () {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [token, setToken] = React.useState("");
  const [type, setType] = React.useState("");
  const [result, setResult] = React.useState(null);
  // const [result3, setResult] = React.useState(null);
  const [data, setData] = React.useState("");

  const onCodeScanned = async (typeINF, dataINF, token) => {
    setType(typeINF);
    setData(dataINF);
    setToken(token);
    setModalVisible(false);
    
    const requestProps1 =  {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'usuario': 'liebews',
        'senha': '682541'}}



    const requestProps =  {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'usuario': 'liebews',
        'senha': '682541',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbnZpcm9ubWVudCI6ImxpZWJlIiwic2lkIjoiclVQQkxNcVZzeDVEbzJ4MEhxMldSVjcvVlQ0eGN1LzUrWjBtWDVRaUQzRT0iLCJqdGkiOiIyZjA4NzNkNy1hMTM4LTRlYzItYjBlNS03NmM3ZDQ2NzAwNGYiLCJleHAiOjE2MzMwOTY1NjYsImlzcyI6Imh0dHA6Ly92aXJ0dWFsYWdlLmNvbS5iciJ9.8C_Fib89q0a6ogpmvxp99Pbv3nmIYonwVTVDDwRb7yo'
      },
      body: JSON.stringify(  {
        "produtos": [
            {
                "cdProduto": dataINF
            }
        ],
        "cdPreco": 1,
    
        "empresas": [
            {
                "cdEmpresa": 3,
                "nrCNPJEmpresa": "07421132000136"
            }
        ]
      })}
      //console.log(requestProps) 

      const resp = await fetch('https://www30.bhan.com.br:9443/api/v1/autorizacao/token',requestProps1)
      const response = await fetch('https://www30.bhan.com.br:9443/api/v1/produto/precoproduto',requestProps)
      const result3 = await resp.json();
      const result2 = await response.json();
      console.log(result2)
      console.log(result3)
        setResult(result2)
        setResult(result3)
          

        
  };

  return (
    <View style={styles.centeredView}>
<Image style={{marginLeft:130,marginBottom:30,marginTop:100}} source = {require('./LOGOSTOPO.png')}/>
             
             <Image style={{width:538
             ,height:700,marginLeft:132,marginBottom:60 }} source = {require('./FOTO-ME-ENCANTAN-LOS-COLORES.gif')}/>              
             
             <Text style ={{
               textAlign:'center',
               fontSize:26,
               marginLeft:10,
               marginBottom:160,
               }}>COLEÇÃO ME ENCANTAN LOS COLORES</Text>

              


              <View style={{paddingLeft:230}}>
              <TouchableOpacity style={styles.btnCadastro} 
                    onPress={() => setModalVisible(true)}>
                    

                          <Text style={{color:'white',textAlign:'center'}}>
                            LER CODIGO DE BARRA
                          </Text>
                                   </TouchableOpacity>
                                   </View>




      <View>
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modal}>
          <Camera onCodeScanned={onCodeScanned} />

          <TouchableOpacity style={styles.btnCadastro2} 
                    onPress={() => setModalVisible(false)
                    }>
                      

                          <Text style={{color:'white',textAlign:'center'}}>
                            CANCELAR
                          </Text>
                                   </TouchableOpacity>
                                 
        </View>
      </Modal>
      </View>
      <StatusBar style="auto" />

      
      
      {result && 
    <Text style={{fontSize:25, color:'#fff',backgroundColor:'#000000a0',padding:10,paddingRight:12,marginTop:10,paddingLeft:25 }}>
         {result.precos[0].dsProduto}</Text>
      }
     
      {result && 
      <Text style={{fontSize:50, color:'#fff',backgroundColor:'#000000a0',padding:10,paddingRight:15, paddingLeft:240 }}> 
      R$ {result.precos[0].vlPreco}0</Text>
      }
      {result && 
      <Text style={{fontSize:15,color:'#fff',backgroundColor:'#000000a0',padding:10,paddingRight:10, paddingLeft:300 }}>
      REF {result.precos[0].cdReferencia}</Text>
      }
  
     


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent:"flex-end",
    // alignItems: "center"
  },

  modal: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "lightgrey",
    marginTop: 630,
    backgroundColor:'#000000a0',
    marginLeft:110,
    marginRight:110,
    marginBottom:40,
   


  },
  btnCadastro:{
    width:'60%',
    height:40,
    backgroundColor:'#000000a0',
    marginTop:10,
    justifyContent:'center',
    borderRadius:20,
    fontFamily:'',
  },
  btnCadastro2:{
    width:'40%',
    height:40,
    backgroundColor:'#000000a0',
    marginTop:1,
    justifyContent:'center',
    borderRadius:20,
    fontFamily:'',
  },

});
