package com.birlingo;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Map;
import java.util.HashMap;

import android.content.Context;
import android.media.AudioAttributes;
import android.media.AudioManager;
import android.media.MediaPlayer;
import android.media.SoundPool;
import android.util.Log;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import org.json.JSONArray;
import org.json.JSONObject;

public class AudioServiceModule extends ReactContextBaseJavaModule {
    ReactContext context;
    AudioServiceModule(ReactApplicationContext context) {
        super(context);
        this.context = context;
    }
    MediaPlayer mp = new MediaPlayer();
    int playing;
    int[] newArr;
    @Override
    public String getName() {
        return "AudioServiceModule";
    }

    @ReactMethod
    public void playActiveSound(String name, String active_Text) {
        try {
            Log.d("AudioServiceModule", "Create " + name + " " + active_Text );
            float speed;
            if(active_Text.equals("Langsam")) {
                speed = 0.60f;
            }else{
                speed = 1.00f;
            }

            mp.setDataSource(name);
            mp.prepare();
            mp.setPlaybackParams(mp.getPlaybackParams().setSpeed(speed));
            mp.setLooping(true);
            mp.start();
            } catch (Exception e) {
                e.printStackTrace();
            }

    }

    @ReactMethod
    public void pauseActiveSound() {
        try {
            Log.d("Stop", "stop");
            mp.pause();
            mp.reset();
        }catch (Exception e) {
            e.printStackTrace();
        }
    }

    @ReactMethod
    public void stopSound() {
        try {
            Log.d("Stop", "stop");
            mp.stop();
            mp.reset();
        }catch (Exception e) {
            e.printStackTrace();
        }
    }

    @ReactMethod
    public void playSpeak(String arr, String active_Text) {
        try {
            Log.d("dummy", "dummy");
            Log.d("arr", "array" + arr.toString());
            JSONArray inputArray = new JSONArray(arr);
            Log.d("JSONObject", "JSONObject" + inputArray.getJSONObject(0));
            String[] array = new String[inputArray.length()];
            for (int i = 0; i < inputArray.length(); i++) {
                JSONObject jObj = inputArray.getJSONObject(i);
                array[i] = jObj.getString("url");
            }
            for (int j = 0; j < array.length; j++) {
                Log.d("Stringarray", "ar " + array[j]);
            }
            float speed;
            if (active_Text.equals("Langsam")) {
                speed = 0.60f;
            } else {
                speed = 1.00f;
            }

            playing = 0;
            mp.setDataSource(array[playing]);
            mp.prepare();
            mp.setPlaybackParams(mp.getPlaybackParams().setSpeed(speed));

            mp.start();

            mp.setOnCompletionListener(new MediaPlayer.OnCompletionListener() {
                @Override
                public void onCompletion(MediaPlayer mp) {
                    try {
                        Log.d("repeat", "repeat" + playing);
                        Log.d("Playing", "array.length " + array.length);
                        WritableMap params = Arguments.createMap(); // add here the data you want to send
                        params.putInt("index",  playing);
                        sendEvent(context, "audioChange", params);
                        playing++;
                        if(playing > array.length -1 ){
                            return;
                        }
                        mp.reset();
                        mp.setDataSource(array[playing]);
                        mp.prepare();
                        mp.setPlaybackParams(mp.getPlaybackParams().setSpeed(speed));
                        mp.start();

                    } catch (IOException e) {
                        Log.d("error", "onCompletion: " + e.toString());
                        throw new RuntimeException(e);
                    }
                }
            });

            mp.setOnErrorListener(new MediaPlayer.OnErrorListener() {
                @Override
                public boolean onError(MediaPlayer mp, int what, int extra) {
                    return true;
                }
            });
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @ReactMethod
    public void pauseSpeak() {
        try{
            mp.stop();
            mp.reset();
        }catch (Exception e){
            Log.d("Error", "error" + e.toString());
            e.printStackTrace();
        }
    }

    @ReactMethod
    public void playRepeat(String name, String active_Text, Promise promise) {
        try {
            Log.d("AudioServiceModule", "Create " + name + " " + active_Text );
            float speed;
            if(active_Text.equals("Langsam")) {
                speed = 0.60f;
            }else{
                speed = 1.00f;
            }
            mp.reset();
            mp.setDataSource(name);
            mp.prepare();
            mp.setPlaybackParams(mp.getPlaybackParams().setSpeed(speed));
//            mp.setLooping(true);
            mp.start();

            mp.setOnCompletionListener(new MediaPlayer.OnCompletionListener() {
                @Override
                public void onCompletion(MediaPlayer mp) {
                    try {
                        Log.d("promise", "promise");
                        promise.resolve(true);
                    } catch (Exception e) {
                        e.printStackTrace();
                        promise.reject(e.toString());
                    }
                }
            });

            mp.setOnErrorListener(new MediaPlayer.OnErrorListener() {
                @Override
                public boolean onError(MediaPlayer mp, int what, int extra) {
                    return true;
                }
            });
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @ReactMethod
    public void pauseRepeat() {
        try {
            Log.d("Stop", "stop");
            mp.stop();
            mp.reset();
        }catch (Exception e) {
            e.printStackTrace();
        }
    }

    @ReactMethod
    public void playLoop(String arr, String active_Text){
        try{
            Log.d("dummy", "dummy");
            Log.d("arr", "array" + arr.toString());
            JSONArray inputArray = new JSONArray(arr);
            Log.d("JSONObject", "JSONObject" + inputArray.getJSONObject(0));
            String[] array = new String[inputArray.length()];
            for(int i =0; i < inputArray.length(); i++){
                JSONObject jObj = inputArray.getJSONObject(i);
                array[i] = jObj.getString("url");
            }
            for(int j =0; j < array.length ; j++){
                Log.d("Stringarray", "ar " + array[j]);
            }
            float speed;
            if(active_Text.equals("Langsam")) {
                speed = 0.60f;
            }else{
                speed = 1.00f;
            }
            while (true) {
                playing = 0;
                mp.setDataSource(array[playing]);
                mp.prepare();
                mp.setPlaybackParams(mp.getPlaybackParams().setSpeed(speed));

                mp.start();

                mp.setOnCompletionListener(new MediaPlayer.OnCompletionListener() {
                    @Override
                    public void onCompletion(MediaPlayer mp) {
                        try {
                            playing++;
                            Log.d("Playing", "Playing " + playing);
                            if(playing > array.length -1 ){
                                playing = 0;
                            }
                            mp.reset();
                            mp.setDataSource(array[playing]);
                            mp.prepare();
                            mp.setPlaybackParams(mp.getPlaybackParams().setSpeed(speed));
                            mp.start();

                        } catch (IOException e) {
                            Log.d("error", "onCompletion: " + e.toString());
                            throw new RuntimeException(e);
                        }
                    }
                });

                mp.setOnErrorListener(new MediaPlayer.OnErrorListener() {
                    @Override
                    public boolean onError(MediaPlayer mp, int what, int extra) {
                        return true;
                    }
                });
            }

        }catch (Exception e) {
            Log.d("error", "outside: " + e.toString());
            e.printStackTrace();
        }
    }

    @ReactMethod
    public void pauseLoop(){
        try{
            mp.stop();
            mp.reset();
        }catch (Exception e){
            Log.d("Error", "error" + e.toString());
            e.printStackTrace();
        }
    }

    private void sendEvent(ReactContext reactContext, String eventName, @Nullable WritableMap params) {
        reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);
    }

    private int listenerCount = 0;

    @ReactMethod
    public void addListener(String eventName) {
        if (listenerCount == 0) {
            // Set up any upstream listeners or background tasks as necessary
        }

        listenerCount += 1;
    }

    @ReactMethod
    public void removeListeners(Integer count) {
        listenerCount -= count;
        if (listenerCount == 0) {
            // Remove upstream listeners, stop unnecessary background tasks
        }
    }

//    params.putString("eventProperty", "someValue");
//    sendEvent(reactContext, "EventReminder", params);
}
