//
//  ViewController.swift
//  Pro App
//
//  Created by Scripchin Mihail on 1/31/20.
//  Copyright © 2020 Scripchin Mihail. All rights reserved.
//

import UIKit
import FacebookLogin
import FacebookCore

class ViewController: UIViewController {
    
    
    @IBAction func logarefacebook(_ sender: Any) {
        
        if AccessToken.current != nil{
            let pvc = self.storyboard?.instantiateViewController(withIdentifier: "UINavigationController") as? UINavigationController
            self.present(pvc!, animated: true, completion: nil)
            
        } else {
            let manager = LoginManager()
            manager.logIn(permissions: [Permission.publicProfile], viewController:  self) { loginResult in
                switch loginResult {
                case .failed(let error):
                    print(error)
                case .cancelled:
                    print("User canceled")
                case .success(let grantedPermission, let declinedPermission, let accessToken):
                    print("Logged in")
                    let pvc = self.storyboard?.instantiateViewController(withIdentifier: "UINavigationController") as? UINavigationController
                    self.present(pvc!, animated: true, completion: nil)  
                }
            }
        }
        
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.
    }


}

