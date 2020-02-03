//
//  DetaliiViewController.swift
//  Pro App
//
//  Created by Grosu Alexandru on 2/3/20.
//  Copyright © 2020 Scripchin Mihail. All rights reserved.
//

import UIKit

class DetaliiViewController: UIViewController {

    @IBOutlet weak var imageView: UIImageView! {
        didSet {
            guard let image = menu?.numeImagine else {return}
            imageView.image = UIImage(named: image)
        }
    }
    @IBOutlet weak var nameLabel: UILabel! {
        didSet {
            nameLabel.text = menu?.nume
        }
    }
    
    var menu: Menu?
    
    @IBAction func cumparaButton(_ sender: Any) {
        
        let alert = UIAlertController(title: "Atentie!", message: "Comanda plasata cu succes!", preferredStyle: UIAlertController.Style.alert)
                alert.addAction(UIAlertAction(title: "OK", style: UIAlertAction.Style.default, handler: nil))
                self.present(alert, animated: true, completion: nil)
            
        
    }
    override func viewDidLoad() {
        super.viewDidLoad()

    }
    

}
