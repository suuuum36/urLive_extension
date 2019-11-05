// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';


function Robot() {
  this.name = Robot.makeId();
 }
 
 Robot.nums   = Array.from({length:16},(_,i) => i);
 Robot.chars  = Array.from({length:26},(_,i) => String.fromCharCode(65+i));
 Robot.idmap  = {};
 Robot.makeId = function(){
                  var text = Array.from({length:12}, _ => Robot.chars[~~(Math.random()*26)]).join("") +
                             Array.from({length:24}, _ => Robot.nums[~~(Math.random()*10)]).join("");
                  return !Robot.idmap[text] ? (Robot.idmap[text] = true,text) : Robot.makeId();
                };
 
function robotFactory(n){
  return new Robot()
}


whale.runtime.onInstalled.addListener(function() {
  const myRobotArmy = robotFactory();
  whale.storage.sync.set({uid: myRobotArmy.name}, () => {

  });
});

