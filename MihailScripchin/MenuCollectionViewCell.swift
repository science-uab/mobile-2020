//
//  MenuCollectionViewCell.swift
//  Pro App
//
//  Created by Scripchin Mihail on 2/3/20.
//  Copyright © 2020 Scripchin Mihail. All rights reserved.
//

import UIKit

class MenuCollectionViewCell: UICollectionViewCell {
    
    
    @IBOutlet weak var imageView: UIImageView!
    @IBOutlet weak var nameLabel: UILabel!
    
    var menu: Menu? {
        didSet {
            nameLabel.text = menu?.nume
            if let image = menu?.numeImagine {
                imageView.image = UIImage(named: image)
            }
        }
    }
}
