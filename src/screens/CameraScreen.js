import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Camera } from "expo-camera";
import Toolbar from "../components/Toolbar.js";
import Gallery from "../components/Gallery.js";
import * as Permissions from "expo-permissions";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from 'expo-media-library';
const { width: winWidth, height: winHeight } = Dimensions.get("window");

export default class CamerScreen extends React.Component {
  camera = null;

  state = {
    captures: [],
    flashMode: Camera.Constants.FlashMode.off,
    capturing: null,
    cameraType: Camera.Constants.Type.front,
    hasCameraPermission: null,
  };

  setFlashMode = (flashMode) => this.setState({ flashMode });
  setCameraType = (cameraType) => this.setState({ cameraType });
  handleCaptureIn = () => this.setState({ capturing: true });

  handleCaptureOut = () => {
    if (this.state.capturing) this.camera.stopRecording();
  };

  handleShortCapture = async () => {
    try {
      const photoData = await this.camera.takePictureAsync();
      this.setState({
        capturing: false,
        captures: [photoData, ...this.state.captures],
      });
      console.log(photoData.uri);
      const asset = await MediaLibrary.createAssetAsync(photoData.uri);
      /*
      let folder = FileSystem.documentDirectory + "vic";
      await FileSystem.makeDirectoryAsync(folder, {
        intermediates: true,
      });

      var fi = await FileSystem.getInfoAsync(folder);
      console.log(fi)
      //alert(JSON.stringify(fi));
      
      await FileSystem.moveAsync({
        from: photoData.uri,
        to:
        folder +"/"+
          new Date().toISOString() +
          ".jpg",
      });*/
      /*
      const local = await FileSystem.makeDirectoryAsync(
        FileSystem.documentDirectory + "vic/"
      );
      console.log(local);
      */
    } catch (error) {
      return alert(error);
    }
  };

  handleLongCapture = async () => {
    const videoData = await this.camera.recordAsync();
    this.setState({
      capturing: false,
      captures: [videoData, ...this.state.captures],
    });
  };

  async componentDidMount() {
    const camera = await Permissions.askAsync(Permissions.CAMERA);
    const audio = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
   
    const hasCameraPermission =
      camera.status === "granted" && audio.status === "granted";

    this.setState({ hasCameraPermission });
  }

  render() {
    // console.log(this.state.captures)
    const {
      hasCameraPermission,
      flashMode,
      cameraType,
      capturing,
      captures,
    } = this.state;

    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>Access to camera has been denied.</Text>;
    }

    return (
      // <React.Fragment >
      <View style={styles.container}>
        <View>
          <Camera
            type={cameraType}
            flashMode={flashMode}
            style={styles.preview}
            ref={(camera) => (this.camera = camera)}
          />
        </View>
        {this.state.captures.length > 0 && <Gallery captures={captures} />}
        <Toolbar
          capturing={capturing}
          flashMode={flashMode}
          cameraType={cameraType}
          setFlashMode={this.setFlashMode}
          setCameraType={this.setCameraType}
          onCaptureIn={this.handleCaptureIn}
          onCaptureOut={this.handleCaptureOut}
          onLongCapture={this.handleLongCapture}
          onShortCapture={this.handleShortCapture}
        />
      </View>
      // </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  preview: {
    height: (winHeight / 4) * 3,
    width: winWidth,
    // position: 'absolute',
    left: 0,
    top: 30,
    right: 0,
    bottom: 0,
  },
  container: {
    backgroundColor: "black",
    height: winHeight,
  },
});
