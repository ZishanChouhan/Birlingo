//
//  AudioServiceModule.h
//  birlingo
//
//  Created by MAC-4 on 20/03/23.
//  Copyright © 2023 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>
#import <AudioToolbox/AudioToolbox.h>
#import <AVFoundation/AVFoundation.h>
#import <React/RCTEventEmitter.h>
//NS_ASSUME_NONNULL_BEGIN

@interface AudioServiceModule : RCTEventEmitter <RCTBridgeModule, AVAudioPlayerDelegate>

+ (void) playAudioFile;
//- (void) sendEventWithName;
@end

//NS_ASSUME_NONNULL_END
