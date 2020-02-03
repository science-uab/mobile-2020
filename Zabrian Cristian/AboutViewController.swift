//
//  AboutViewController.swift
//  Compass
//
//  Created by Cristian Zabrian on 8/30/17.
//  Copyright © 2017 Kimchi Media. All rights reserved.
//

import UIKit

class AboutViewController: UIViewController {
    
    @IBOutlet weak var phoneLabel: UILabel!
    @IBOutlet weak var phoneBottomDistance: NSLayoutConstraint!
    
    @IBOutlet weak var mailLabel: UILabel!
    @IBOutlet weak var sambadLabel: UILabel!
    
    @IBOutlet weak var regardsTop: NSLayoutConstraint!
    @IBOutlet weak var regardsLabel: UILabel!
    @IBOutlet weak var regardsWidth: NSLayoutConstraint!
    
    @IBOutlet weak var imagesView: UIView!
    @IBOutlet weak var imagesViewHeight: NSLayoutConstraint!
    @IBOutlet weak var imagesViewWidth: NSLayoutConstraint!
    @IBOutlet weak var verticalCons: NSLayoutConstraint!
    
    @IBOutlet weak var havaLabelBottom: NSLayoutConstraint!
    @IBOutlet weak var havaLabel: UILabel!
    
    @IBOutlet weak var combineHeight: NSLayoutConstraint!
    @IBOutlet weak var combineWidth: NSLayoutConstraint!
    @IBOutlet weak var combineBottom: NSLayoutConstraint!
    
    @IBOutlet weak var xTop: NSLayoutConstraint!
    
    @IBOutlet weak var aetirnarLabel: UILabel!
    

    override func viewDidLoad() {
        super.viewDidLoad()
        
        
        degreesDistanceByDevice()
        

    }

    @IBAction func dispose(_ sender: Any) {
        
        self.dismiss(animated: true, completion: nil)
    }

    
    func degreesDistanceByDevice(){
        
        switch UIDevice.current.deviceType {
            
        case .iPhone4, .iPhone4S:
            
            self.regardsLabel.font = regardsLabel.font.withSize(15)
            
            self.imagesViewHeight.constant = 100
            self.imagesViewWidth.constant = 170
            self.verticalCons.constant = 35
            
            self.havaLabel.font = havaLabel.font.withSize(15)
            self.combineWidth.constant = 142
            self.combineHeight.constant = 34
            self.aetirnarLabel.font = aetirnarLabel.font.withSize(15)
            
        case .iPhone5, .iPhone5S, .iPhoneSE, .iPhone5C:
            
            break
            
        case .iPhone6,.iPhone6S, .iPhone7:
            
            self.xTop.constant = 20
            self.combineBottom.constant = 30
            
        case .iPhone7Plus,.iPhone6Plus, .iPhone6SPlus:
            
            self.regardsLabel.font = regardsLabel.font.withSize(25)
            self.regardsWidth.constant = 280
            
            self.combineBottom.constant = 30
            self.combineWidth.constant = 182
            self.combineHeight.constant = 74
            
            self.phoneBottomDistance.constant = 40
            self.xTop.constant = 20
            
            self.imagesViewHeight.constant = 200
            self.imagesViewWidth.constant = 328
            
        
       case .iPad, .iPad2, .iPad3, .iPad4, .iPadAir, .iPadAir2, .iPadMini, .iPadMini3, .iPadMini4, .iPadMiniRetina, .iPadPro9Inch:
            
        self.regardsLabel.font = regardsLabel.font.withSize(30)
        self.regardsTop.constant = 35
        self.regardsWidth.constant = 500
        
        self.havaLabel.font = havaLabel.font.withSize(30)
        self.aetirnarLabel.font = aetirnarLabel.font.withSize(25)
        
        self.combineBottom.constant = 40
        self.combineWidth.constant = 260
        self.combineHeight.constant = 110
        
        self.phoneBottomDistance.constant = 80
        self.xTop.constant = 40
        
        self.imagesViewHeight.constant = 270
        self.imagesViewWidth.constant = 650
        
        self.phoneLabel.font = phoneLabel.font.withSize(25)
        self.mailLabel.font = mailLabel.font.withSize(25)
        self.sambadLabel.font = sambadLabel.font.withSize(30)
            
            
        
        case .iPadPro12Inch :
            
            self.regardsLabel.font = regardsLabel.font.withSize(35)
            self.regardsTop.constant = 35
            self.regardsWidth.constant = 600
            
            self.havaLabel.font = havaLabel.font.withSize(35)
            self.aetirnarLabel.font = aetirnarLabel.font.withSize(35)
            
            self.combineBottom.constant = 40
            self.combineWidth.constant = 400
            self.combineHeight.constant = 200
            
            self.phoneBottomDistance.constant = 80
            self.xTop.constant = 50
            
            self.imagesViewHeight.constant = 350
            self.imagesViewWidth.constant = 800
            
            self.phoneLabel.font = phoneLabel.font.withSize(30)
            self.mailLabel.font = mailLabel.font.withSize(30)
            self.sambadLabel.font = sambadLabel.font.withSize(35)
            
            
        default:
            
            break
            
            
        }
        
    }

}
