//
//  AudioServiceModule.m
//  birlingo
//
//  Created by MAC-4 on 20/03/23.
//  Copyright © 2023 Facebook. All rights reserved.
//

#import "AudioServiceModule.h"
#import <React/RCTLog.h>
#import <AudioToolbox/AudioToolbox.h>
#import <AVFoundation/AVFoundation.h>
#import <React/RCTConvert.h>
//@interface RCTConvert (NSMutableArray)
//
//+ (NSMutableArray *)NSMutableArray:(id) json;
//
//@end

//@implementation RCTConvert (NSMutableArray)
//RCT_CUSTOM_CONVERTER(NSMutableArray *, NSMutableArray, [NSMutableArray arrayWithContentsOfFile:json])
//
//@end

//@interface AudioServiceModule: NSObject <AVAudioPlayerDelegate>
//
//@end

@implementation AudioServiceModule
AVAudioPlayer *player;
AVPlayer *playerR;
int playing = 0;
int loopPlaying = 0;
NSString *active;
NSMutableArray *myArray;
NSMutableArray *loopArray;
RCTPromiseResolveBlock resolve;
AVQueuePlayer *queuePlayer;
AVPlayerLooper *loopPlayer;
NSNotificationCenter *center;
//NSArray<NSString *> arr = [[NSArray alloc] init];
//NSArray myArray = [[NSMutableArray alloc] init];



- (void) playAudioFile:(int) index{
  NSError *error;
  //    [player reset];
  //    player = nil;
  NSURL *soundFileURL = [NSURL fileURLWithPath: myArray[index]];
  NSLog( @"url is %@", [soundFileURL absoluteString]);
  player = [[AVAudioPlayer alloc] initWithContentsOfURL:soundFileURL error:&error];
  
  if(player == nil){
    NSLog(@"error%@", [error description]);
  }else{
    if([active isEqualToString:@"Langsam"]){
      player.enableRate =  true;
      player.rate = 0.6;
    }else{
      
    }
    player.delegate = self;
    [player prepareToPlay];
    [player play];
  }
}

- (void) audioPlayerDidFinishPlaying:(AVAudioPlayer *)player successfully:(BOOL)flag{
  NSLog(@"play finished %d %@", flag, player);
  if(flag){
//    NSNumber *value = [NSNumber numberWithInt:playing];
//    [self sendEventWithName:@"audioChange" body:@{@"index": value}];
    playing++;
    NSLog(@"playing value %d", [myArray count]);
    NSLog(@"playing value %d", playing);
    if(playing >= [myArray count]){
      playing = 0;
    }
    [self playAudioFile: playing];
    
  }
}

RCT_EXPORT_MODULE()

RCT_EXPORT_METHOD(playActiveSound:(NSString *)url activeText:(NSString *)activeText)
{
  NSLog(@"Pretending to create an event %@ at %@", url, activeText);
  NSError *error;
  NSURL *soundFileURL = [NSURL fileURLWithPath:url];
  
  NSLog( @"url is %@", [soundFileURL absoluteString]);
  player = [[AVAudioPlayer alloc] initWithContentsOfURL:soundFileURL error:&error];
  
  if(player == nil){
    NSLog(@"%@", [error description]);
  }else{
    if([activeText isEqualToString:@"Langsam"]){
      player.enableRate =  true;
      player.rate = 0.6;
    }else{
      
    }
    player.numberOfLoops = -1;
    [player prepareToPlay];
    [player play];
  }
}

RCT_EXPORT_METHOD(pauseActiveSound)
{
  NSLog(@"Pretending to stop");
  [player stop];
  [playerR pause];
}

RCT_EXPORT_METHOD(playSpeak:(NSArray<NSString *> *)jsonArr activeText:(NSString *) activeText)
{
    loopPlaying = 0;
    loopArray = [jsonArr mutableCopy];
    active = activeText;
    NSError *error;
//    [[AVAudioSession sharedInstance] setDelegate:self];
//    [[AVAudioSession sharedInstance] setCategory:AVAudioSessionCategoryPlayAndRecord error:&error];
//    [[AVAudioSession sharedInstance] setActive: YES error: NULL];
  
    NSURL *soundFileURL = [NSURL fileURLWithPath: jsonArr[0]];
    NSLog( @"url is %@", [soundFileURL absoluteString]);
    AVPlayerItem *playerItem = [AVPlayerItem playerItemWithURL: soundFileURL];
    NSLog(@"player item %@", playerItem);
//    UInt32 doChangeDefaultRoute = 1;
//    AudioSessionSetProperty(kAudioSessionProperty_OverrideCategoryDefaultToSpeaker, sizeof(doChangeDefaultRoute), &doChangeDefaultRoute);
    [[NSNotificationCenter defaultCenter] removeObserver:self];
    [[NSNotificationCenter defaultCenter] addObserver:self selector: @selector(oneItemDidFinishPlaying:) name:AVPlayerItemDidPlayToEndTimeNotification  object:playerItem];
    playerR = [[AVPlayer alloc] initWithPlayerItem:playerItem];
  
    if(playerR == nil){
      NSLog(@"%@", [error description]);
    }else{
      if([activeText isEqualToString:@"Langsam"]){
        //      playerR.enableRate =  true;
        playerR.rate = 0.6;
      }else{
        [playerR play];
      }
    }
}

RCT_EXPORT_METHOD(pauseSpeak)
{
  NSLog(@"Pretending to stop");
  [player stop];
  [playerR pause];
}

RCT_EXPORT_METHOD(playRepeat: (NSString *)url activeText:(NSString *)activeText resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
  NSLog(@"Pretending to create an event %@ at %@", url, activeText);
  NSError *error;
  NSURL *soundFileURL = [NSURL fileURLWithPath:url];
  
//  NSLog( @"url is %@", [soundFileURL absoluteString]);
  AVPlayerItem *playerItem = [AVPlayerItem playerItemWithURL: soundFileURL];
//  NSLog(@"player item %@", playerItem);
//  [[NSNotificationCenter defaultCenter] addObserver:self selector: @selector(itemDidFinishPlaying:) name:AVPlayerItemDidPlayToEndTimeNotification object:playerItem];
  playerR = [[AVPlayer alloc] initWithPlayerItem:playerItem];
  
  if(playerR == nil){
    NSLog(@"%@", [error description]);
    reject(@"event_failure", @"no event id returned", error);
  }else{
    if([activeText isEqualToString:@"Langsam"]){
//      playerR.enableRate =  true;
      playerR.rate = 0.6;
    }else{
      [playerR play];
    }
//    playerR.delegate = self;
//    [playerR prepareToPlay];
//    [playerR play];
    
    [[NSNotificationCenter defaultCenter] addObserver:self selector: @selector(itemDidFinishPlaying:) name:AVPlayerItemDidPlayToEndTimeNotification object:playerItem];
  }
}

-(void) itemDidFinishPlaying:(NSNotification *) notification {
  [[NSNotificationCenter defaultCenter] removeObserver:self];
  NSLog(@"notification is");
  NSString *eventName = @"Completed";
  [self sendEventWithName:@"Completed" body:@{@"name": eventName}];
}

- (NSArray<NSString *> *)supportedEvents {
  NSMutableArray *arr = [NSMutableArray array];
  [arr addObject:@"Completed"];
  [arr addObject:@"audioChange"];
  return arr;
}

RCT_EXPORT_METHOD(pauseRepeat)
{
  NSLog(@"Pretending to stop");
  [playerR pause];
}

RCT_EXPORT_METHOD(playLoop:(NSArray<NSString *> *)jsonArr activeText:(NSString *) activeText)
{
  NSLog(@"Play to loop %@", jsonArr);
  
  playing = 0;
  myArray = [jsonArr mutableCopy];
  active = activeText;
  [self playAudioFile: playing];
  
}

- (void) oneItemDidFinishPlaying:(NSNotification *) notification {
  [[NSNotificationCenter defaultCenter] removeObserver:self];  
  NSLog(@" one notification is %@", notification);
  NSError *err;
  NSNumber *value = [NSNumber numberWithInt:loopPlaying];
  [self sendEventWithName:@"audioChange" body:@{@"index": value}];
  
  loopPlaying++;
  if(loopPlaying < [loopArray count]){
    NSLog(@" loopPlaying %d", loopPlaying);
    NSLog(@" loopArray is %d", [loopArray count]);
    NSURL *soundFileURL = [NSURL fileURLWithPath: loopArray[loopPlaying]];
    NSLog(@"soundFileURL %@", soundFileURL);
    AVPlayerItem *pItem = [AVPlayerItem playerItemWithURL: soundFileURL];
    
    [[NSNotificationCenter defaultCenter] addObserver:self selector: @selector(oneItemDidFinishPlaying:) name:AVPlayerItemDidPlayToEndTimeNotification object:pItem];
    
    playerR = [[AVPlayer alloc] initWithPlayerItem:pItem];
    if(playerR == nil){
      NSLog(@"%@", [err description]);
    }else{
      if([active isEqualToString:@"Langsam"]){
        //      playerR.enableRate =  true;
        playerR.rate = 0.6;
      }else{
        [playerR play];
      }
    }
  }
//  else{
//    loopPlaying = 0;
//    NSURL *soundFileURL = [NSURL fileURLWithPath: loopArray[loopPlaying]];
//    NSLog(@"soundFileURL %@", soundFileURL);
//    AVPlayerItem *pItem = [AVPlayerItem playerItemWithURL: soundFileURL];
//    [[NSNotificationCenter defaultCenter] addObserver:self selector: @selector(oneItemDidFinishPlaying:) name:AVPlayerItemDidPlayToEndTimeNotification object:pItem];
//
//    playerR = [[AVPlayer alloc] initWithPlayerItem:pItem];
//    if(playerR == nil){
//      NSLog(@"%@", [err description]);
//    }else{
//      if([active isEqualToString:@"Langsam"]){
//        //      playerR.enableRate =  true;
//        playerR.rate = 0.6;
//      }else{
//        [playerR play];
//      }
//    }
//  }
}

RCT_EXPORT_METHOD(pauseLoop)
{
  NSLog(@"Pretending to stop");
  [player pause];
}

RCT_EXPORT_METHOD(stopSound)
{
  NSLog(@"Pretending to stop");
  [player stop];
  [playerR pause];
}

@end
