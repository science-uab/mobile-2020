//
//  MapViewControllerDelegate.swift
//  compass
//
//  Created by Zabrian Cristian on 12/07/2017.
//  Copyright © 2017 zCode. All rights reserved.
//

import Foundation
import CoreLocation

protocol MapViewControllerDelegate {
  func update(location: CLLocation)
}
