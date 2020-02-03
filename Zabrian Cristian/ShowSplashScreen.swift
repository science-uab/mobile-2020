//
//  ShowSplashScreen.swift
//  Compass
//
//  Created by Cristian Zabrian on 9/5/17.
//  Copyright © 2017 Kimchi Media. All rights reserved.
//

import UIKit

class ShowSplashScreen: UIViewController {

    @IBOutlet weak var imagePresentation: UIImageView!
    
    @IBOutlet weak var textPresentation: UILabel!
    
    override func viewDidLoad() {
        super.viewDidLoad()

        perform(#selector(ShowSplashScreen.showV), with: nil, afterDelay: 2)
        
        degreesDistanceByDevice()
        
    }
    
    @objc func showV(){
        performSegue(withIdentifier: "showSplashScreen", sender: self)
    }

    func degreesDistanceByDevice(){
        
        switch UIDevice.current.deviceType {
            
        case .iPhone4, .iPhone4S:
            
            break
            
        case .iPhone5, .iPhone5S, .iPhoneSE, .iPhone5C:
            
            break
            
        case .iPhone6,.iPhone6S, .iPhone7:
            
            self.textPresentation.font = textPresentation.font.withSize(25)
            
        case .iPhone7Plus,.iPhone6Plus, .iPhone6SPlus:
            
            self.textPresentation.font = textPresentation.font.withSize(25)
            
            
       case .iPad, .iPad2, .iPad3, .iPad4, .iPadAir, .iPadAir2, .iPadMini, .iPadMini3, .iPadMini4, .iPadMiniRetina, .iPadPro9Inch:
            
            self.textPresentation.font = textPresentation.font.withSize(30)
            
            self.imagePresentation.image = #imageLiteral(resourceName: "nam")
            
            
        case .iPadPro12Inch :
            
            self.textPresentation.font = textPresentation.font.withSize(30)
            
            self.imagePresentation.image = #imageLiteral(resourceName: "nam")
            
        default:
            
            break
        }
    }

}
