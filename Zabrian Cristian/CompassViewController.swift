//
//  CompassViewController.swift
//  compass
//
//  Created by Zabrian Cristian on 12/07/2017.
//  Copyright © 2017 zCode. All rights reserved.
//

import UIKit
import CoreLocation

class CompassViewController: UIViewController {
  @IBOutlet weak var imageView: UIImageView!
    @IBOutlet weak var arrowImage: UIImageView!
    @IBOutlet weak var degreesView: UIView!
    @IBOutlet weak var polesView: UIView!
    
    @IBOutlet weak var northImage: UIImageView!
    @IBOutlet weak var southImage: UIImageView!
    @IBOutlet weak var westImage: UIImageView!
    @IBOutlet weak var eastImage: UIImageView!
    
    @IBOutlet weak var bottomDegrees: UILabel!
    @IBOutlet weak var bottomDegreesSymbol: UILabel!
    @IBOutlet weak var windNameReturned: UILabel!

    @IBOutlet weak var zeroDegrees: UILabel!
    @IBOutlet weak var degrees30: UILabel!
    @IBOutlet weak var degrees60: UILabel!
    @IBOutlet weak var degrees90: UILabel!
    @IBOutlet weak var degrees120: UILabel!
    @IBOutlet weak var degrees150: UILabel!
    @IBOutlet weak var degrees180: UILabel!
    @IBOutlet weak var degrees210: UILabel!
    @IBOutlet weak var degrees240: UILabel!
    @IBOutlet weak var degrees270: UILabel!
    @IBOutlet weak var degrees300: UILabel!
    @IBOutlet weak var degrees330: UILabel!
    
    
    @IBOutlet weak var arrowHeight: NSLayoutConstraint!
    @IBOutlet weak var arrowWidth: NSLayoutConstraint!
    
    @IBOutlet weak var imageViewWidth: NSLayoutConstraint!
    @IBOutlet weak var imageViewHeight: NSLayoutConstraint!
    

    @IBOutlet weak var northDistance: NSLayoutConstraint!
    @IBOutlet weak var northWidth: NSLayoutConstraint!
    @IBOutlet weak var northHeight: NSLayoutConstraint!
   
    @IBOutlet weak var southDistance: NSLayoutConstraint!
    @IBOutlet weak var southHeight: NSLayoutConstraint!
    @IBOutlet weak var southWidth: NSLayoutConstraint!
   
    @IBOutlet weak var eastDistance: NSLayoutConstraint!
    @IBOutlet weak var eastWidth: NSLayoutConstraint!
    @IBOutlet weak var eastHeight: NSLayoutConstraint!

    @IBOutlet weak var westDistance: NSLayoutConstraint!
    @IBOutlet weak var westWidth: NSLayoutConstraint!
    @IBOutlet weak var westHeight: NSLayoutConstraint!
    

    //degrees constants outlets
    @IBOutlet weak var topZero: NSLayoutConstraint!
    
    @IBOutlet weak var right30: NSLayoutConstraint!
    @IBOutlet weak var top30: NSLayoutConstraint!
    
    @IBOutlet weak var right60: NSLayoutConstraint!
    @IBOutlet weak var top60: NSLayoutConstraint!
    
    @IBOutlet weak var right90: NSLayoutConstraint!
    
    @IBOutlet weak var right120: NSLayoutConstraint!
    @IBOutlet weak var bottom120: NSLayoutConstraint!
    
    @IBOutlet weak var right150: NSLayoutConstraint!
    @IBOutlet weak var bottom150: NSLayoutConstraint!
    
    @IBOutlet weak var bottom180: NSLayoutConstraint!
    
    @IBOutlet weak var left210: NSLayoutConstraint!
    @IBOutlet weak var bottom210: NSLayoutConstraint!
    
    @IBOutlet weak var left240: NSLayoutConstraint!
    @IBOutlet weak var bottom240: NSLayoutConstraint!
    
    @IBOutlet weak var left270: NSLayoutConstraint!
    
    @IBOutlet weak var left300: NSLayoutConstraint!
    @IBOutlet weak var top300: NSLayoutConstraint!
    
    @IBOutlet weak var left330: NSLayoutConstraint!
    @IBOutlet weak var top330: NSLayoutConstraint!
    
    //////////
    
    //altitude/longitude/latitude
    
    @IBOutlet weak var aboveSeaLabel: UILabel!
    @IBOutlet weak var latitudeLabel: UILabel!
    
    
    //compass constraints
    
    @IBOutlet weak var arrowImageY: NSLayoutConstraint!
    @IBOutlet weak var compassBgY: NSLayoutConstraint!
    
    //TableOutlets
    
    @IBOutlet weak var firstCell: NSLayoutConstraint!
    @IBOutlet weak var bottomDegreesHeight: NSLayoutConstraint!
    
    //second cell
    @IBOutlet weak var coordinateLabel: UILabel!
    @IBOutlet weak var cell2Height: NSLayoutConstraint!
    @IBOutlet weak var flagWifth: NSLayoutConstraint!
    @IBOutlet weak var flagHeight: NSLayoutConstraint!
    @IBOutlet weak var coordinateLabelHeight: NSLayoutConstraint!
    @IBOutlet weak var coordinateDataLabel: UILabel!
    
    //////
    
    //third cell
    @IBOutlet weak var altitudeLabel: UILabel!
    @IBOutlet weak var altitudeCellHeight: NSLayoutConstraint!
    @IBOutlet weak var metersLabel: UILabel!
    @IBOutlet weak var altitudeLabelHeight: NSLayoutConstraint!
    
    @IBOutlet weak var sageataHeight: NSLayoutConstraint!
    @IBOutlet weak var sageataWidth: NSLayoutConstraint!
    ////////
    
    @IBOutlet weak var view4Center: NSLayoutConstraint!
    
 
    //
    
    
    
    var userLatitude : CLLocationDegrees! = 0
    var userLongitude : CLLocationDegrees! = 0
    var userAltitude : CLLocationDistance! = 0
  
  let locationDelegate = LocationDelegate()
  var latestLocation: CLLocation? = nil
  var yourLocationBearing: CGFloat { return latestLocation?.bearingToLocationRadian(self.yourLocation) ?? 0 }
  var yourLocation: CLLocation {
    get { return UserDefaults.standard.currentLocation }
    set { UserDefaults.standard.currentLocation = newValue }
  }
  
  let locationManager: CLLocationManager = {
    $0.requestWhenInUseAuthorization()
    $0.desiredAccuracy = kCLLocationAccuracyBest
    $0.startUpdatingLocation()
    $0.startUpdatingHeading()
    return $0
  }(CLLocationManager())
  
  private func orientationAdjustment() -> CGFloat {
    let isFaceDown: Bool = {
      switch UIDevice.current.orientation {
      case .faceDown: return true
      default: return false
      }
    }()
    
    let adjAngle: CGFloat = {
      switch UIApplication.shared.statusBarOrientation {
      case .landscapeLeft:  return 90
      case .landscapeRight: return -90
      case .portrait, .unknown: return 0
      case .portraitUpsideDown: return isFaceDown ? 180 : -180
      @unknown default:
      return 0
        }
    }()
    return adjAngle
  }

  override func viewDidLoad() {
    super.viewDidLoad()
    locationManager.delegate = locationDelegate
    
    degreesDistanceByDevice()
    shadow(im: arrowImage)
    shadow(im: imageView)
    
    locationDelegate.locationCallback = { location in
      self.latestLocation = location
    }
    
    locationDelegate.headingCallback = { newHeading in
      
      func computeNewAngle(with newAngle: CGFloat) -> CGFloat {
        let heading: CGFloat = {
          let originalHeading = self.yourLocationBearing - newAngle.degreesToRadians
            let windName : String
            let above : String
            let cord : String
            let criteria = newAngle
            
            self.bottomDegrees.text = String(Int(newAngle))
            
            switch criteria {
                
            case 0..<5.625:
                windName = "N"
                self.userAltitude = self.locationManager.location?.altitude
                above = String(Int(self.userAltitude))
                self.userLatitude = self.locationManager.location?.coordinate.latitude
                self.userLongitude = self.locationManager.location?.coordinate.longitude
                cord = self.coordinateString(self.userLatitude, self.userLongitude)
            case 5.625..<16.875:
                windName = "N"
                self.userAltitude = self.locationManager.location?.altitude
                above = String(Int(self.userAltitude))
                self.userLatitude = self.locationManager.location?.coordinate.latitude
                self.userLongitude = self.locationManager.location?.coordinate.longitude
                cord = self.coordinateString(self.userLatitude, self.userLongitude)
            case 16.875..<28.125:
                windName = "NE"
                self.userAltitude = self.locationManager.location?.altitude
                above = String(Int(self.userAltitude))
                self.userLatitude = self.locationManager.location?.coordinate.latitude
                self.userLongitude = self.locationManager.location?.coordinate.longitude
                cord = self.coordinateString(self.userLatitude, self.userLongitude)
            case 28.125..<39.375:
                windName = "NE"
                self.userAltitude = self.locationManager.location?.altitude
                above = String(Int(self.userAltitude))
                self.userLatitude = self.locationManager.location?.coordinate.latitude
                self.userLongitude = self.locationManager.location?.coordinate.longitude
                cord = self.coordinateString(self.userLatitude, self.userLongitude)
                
            case 39.375..<50.625:
                windName = "NE"
                self.userAltitude = self.locationManager.location?.altitude
                above = String(Int(self.userAltitude))
                self.userLatitude = self.locationManager.location?.coordinate.latitude
                self.userLongitude = self.locationManager.location?.coordinate.longitude
                cord = self.coordinateString(self.userLatitude, self.userLongitude)
                
            case 50.625..<61.875:
                windName = "NE"
                self.userAltitude = self.locationManager.location?.altitude
                above = String(Int(self.userAltitude))
                self.userLatitude = self.locationManager.location?.coordinate.latitude
                self.userLongitude = self.locationManager.location?.coordinate.longitude
                cord = self.coordinateString(self.userLatitude, self.userLongitude)
            case 61.875..<73.125:
                windName = "E"
                self.userAltitude = self.locationManager.location?.altitude
                above = String(Int(self.userAltitude))
                self.userLatitude = self.locationManager.location?.coordinate.latitude
                self.userLongitude = self.locationManager.location?.coordinate.longitude
                cord = self.coordinateString(self.userLatitude, self.userLongitude)
            case 73.125..<84.375:
                windName = "E"
                self.userAltitude = self.locationManager.location?.altitude
                above = String(Int(self.userAltitude))
                self.userLatitude = self.locationManager.location?.coordinate.latitude
                self.userLongitude = self.locationManager.location?.coordinate.longitude
                cord = self.coordinateString(self.userLatitude, self.userLongitude)
            case 84.375..<95.625:
                windName = "E"
                self.userAltitude = self.locationManager.location?.altitude
                above = String(Int(self.userAltitude))
                self.userLatitude = self.locationManager.location?.coordinate.latitude
                self.userLongitude = self.locationManager.location?.coordinate.longitude
                cord = self.coordinateString(self.userLatitude, self.userLongitude)
            case 95.625..<106.875:
                windName = "E"
                self.userAltitude = self.locationManager.location?.altitude
                above = String(Int(self.userAltitude))
                self.userLatitude = self.locationManager.location?.coordinate.latitude
                self.userLongitude = self.locationManager.location?.coordinate.longitude
                cord = self.coordinateString(self.userLatitude, self.userLongitude)
            case 106.875..<118.125:
                windName = "E"
                self.userAltitude = self.locationManager.location?.altitude
                above = String(Int(self.userAltitude))
                self.userLatitude = self.locationManager.location?.coordinate.latitude
                self.userLongitude = self.locationManager.location?.coordinate.longitude
                cord = self.coordinateString(self.userLatitude, self.userLongitude)
            case 118.125..<129.375:
                windName = "SE"
                self.userAltitude = self.locationManager.location?.altitude
                above = String(Int(self.userAltitude))
                self.userLatitude = self.locationManager.location?.coordinate.latitude
                self.userLongitude = self.locationManager.location?.coordinate.longitude
                cord = self.coordinateString(self.userLatitude, self.userLongitude)
                
            case 129.375..<140.625:
                windName = "SE"
                self.userAltitude = self.locationManager.location?.altitude
                above = String(Int(self.userAltitude))
                self.userLatitude = self.locationManager.location?.coordinate.latitude
                self.userLongitude = self.locationManager.location?.coordinate.longitude
                cord = self.coordinateString(self.userLatitude, self.userLongitude)
                
            case 140.625..<151.875:
                windName = "SE"
                self.userAltitude = self.locationManager.location?.altitude
                above = String(Int(self.userAltitude))
                self.userLatitude = self.locationManager.location?.coordinate.latitude
                self.userLongitude = self.locationManager.location?.coordinate.longitude
                cord = self.coordinateString(self.userLatitude, self.userLongitude)
            case 151.875..<163.125:
                windName = "S"
                self.userAltitude = self.locationManager.location?.altitude
                above = String(Int(self.userAltitude))
                self.userLatitude = self.locationManager.location?.coordinate.latitude
                self.userLongitude = self.locationManager.location?.coordinate.longitude
                cord = self.coordinateString(self.userLatitude, self.userLongitude)
            case 163.125..<174.375:
                windName = "S"
                self.userAltitude = self.locationManager.location?.altitude
                above = String(Int(self.userAltitude))
                self.userLatitude = self.locationManager.location?.coordinate.latitude
                self.userLongitude = self.locationManager.location?.coordinate.longitude
                cord = self.coordinateString(self.userLatitude, self.userLongitude)
            case 174.375..<185.625:
                windName = "S"
                self.userAltitude = self.locationManager.location?.altitude
                above = String(Int(self.userAltitude))
                self.userLatitude = self.locationManager.location?.coordinate.latitude
                self.userLongitude = self.locationManager.location?.coordinate.longitude
                cord = self.coordinateString(self.userLatitude, self.userLongitude)
            case 185.625..<196.875:
                windName = "S"
                self.userAltitude = self.locationManager.location?.altitude
                above = String(Int(self.userAltitude))
                self.userLatitude = self.locationManager.location?.coordinate.latitude
                self.userLongitude = self.locationManager.location?.coordinate.longitude
                cord = self.coordinateString(self.userLatitude, self.userLongitude)
            case 196.875..<208.125:
                windName = "S"
                self.userAltitude = self.locationManager.location?.altitude
                above = String(Int(self.userAltitude))
                self.userLatitude = self.locationManager.location?.coordinate.latitude
                self.userLongitude = self.locationManager.location?.coordinate.longitude
                cord = self.coordinateString(self.userLatitude, self.userLongitude)
            case 208.125..<219.375:
                windName = "SW"
                self.userAltitude = self.locationManager.location?.altitude
                above = String(Int(self.userAltitude))
                self.userLatitude = self.locationManager.location?.coordinate.latitude
                self.userLongitude = self.locationManager.location?.coordinate.longitude
                cord = self.coordinateString(self.userLatitude, self.userLongitude)
                
            case 219.375..<230.625:
                windName = "SW"
                self.userAltitude = self.locationManager.location?.altitude
                above = String(Int(self.userAltitude))
                self.userLatitude = self.locationManager.location?.coordinate.latitude
                self.userLongitude = self.locationManager.location?.coordinate.longitude
                cord = self.coordinateString(self.userLatitude, self.userLongitude)
                
            case 230.625..<241.875:
                windName = "SW"
                self.userAltitude = self.locationManager.location?.altitude
                above = String(Int(self.userAltitude))
                self.userLatitude = self.locationManager.location?.coordinate.latitude
                self.userLongitude = self.locationManager.location?.coordinate.longitude
                cord = self.coordinateString(self.userLatitude, self.userLongitude)
            case 241.875..<253.125:
                windName = "W"
                self.userAltitude = self.locationManager.location?.altitude
                above = String(Int(self.userAltitude))
                self.userLatitude = self.locationManager.location?.coordinate.latitude
                self.userLongitude = self.locationManager.location?.coordinate.longitude
                cord = self.coordinateString(self.userLatitude, self.userLongitude)
            case 253.125..<264.375:
                windName = "W"
                self.userAltitude = self.locationManager.location?.altitude
                above = String(Int(self.userAltitude))
                self.userLatitude = self.locationManager.location?.coordinate.latitude
                self.userLongitude = self.locationManager.location?.coordinate.longitude
                cord = self.coordinateString(self.userLatitude, self.userLongitude)
            case 264.375..<275.625:
                windName =  "W"
                self.userAltitude = self.locationManager.location?.altitude
                above = String(Int(self.userAltitude))
                self.userLatitude = self.locationManager.location?.coordinate.latitude
                self.userLongitude = self.locationManager.location?.coordinate.longitude
                cord = self.coordinateString(self.userLatitude, self.userLongitude)
            case 275.625..<286.875:
                windName = "W"
                self.userAltitude = self.locationManager.location?.altitude
                above = String(Int(self.userAltitude))
                self.userLatitude = self.locationManager.location?.coordinate.latitude
                self.userLongitude = self.locationManager.location?.coordinate.longitude
                cord = self.coordinateString(self.userLatitude, self.userLongitude)
            case 286.875..<298.125:
                windName = "W"
                self.userAltitude = self.locationManager.location?.altitude
                above = String(Int(self.userAltitude))
                self.userLatitude = self.locationManager.location?.coordinate.latitude
                self.userLongitude = self.locationManager.location?.coordinate.longitude
                cord = self.coordinateString(self.userLatitude, self.userLongitude)
            case 298.125..<309.375:
                windName = "NW"
                self.userAltitude = self.locationManager.location?.altitude
                above = String(Int(self.userAltitude))
                self.userLatitude = self.locationManager.location?.coordinate.latitude
                self.userLongitude = self.locationManager.location?.coordinate.longitude
                cord = self.coordinateString(self.userLatitude, self.userLongitude)
                
            case 309.375..<320.625:
                windName = "NW"
                self.userAltitude = self.locationManager.location?.altitude
                above = String(Int(self.userAltitude))
                self.userLatitude = self.locationManager.location?.coordinate.latitude
                self.userLongitude = self.locationManager.location?.coordinate.longitude
                cord = self.coordinateString(self.userLatitude, self.userLongitude)
                
            case 320.625..<331.875:
                windName = "NW"
                self.userAltitude = self.locationManager.location?.altitude
                above = String(Int(self.userAltitude))
                self.userLatitude = self.locationManager.location?.coordinate.latitude
                self.userLongitude = self.locationManager.location?.coordinate.longitude
                cord = self.coordinateString(self.userLatitude, self.userLongitude)
            case 331.875..<343.125:
                windName = "NW"
                self.userAltitude = self.locationManager.location?.altitude
                above = String(Int(self.userAltitude))
                self.userLatitude = self.locationManager.location?.coordinate.latitude
                self.userLongitude = self.locationManager.location?.coordinate.longitude
                cord = self.coordinateString(self.userLatitude, self.userLongitude)
            case 343.125..<354.375:
                windName = "N"
                self.userAltitude = self.locationManager.location?.altitude
                above = String(Int(self.userAltitude))
                self.userLatitude = self.locationManager.location?.coordinate.latitude
                self.userLongitude = self.locationManager.location?.coordinate.longitude
                cord = self.coordinateString(self.userLatitude, self.userLongitude)
            case 354.375..<360:
                windName = "N"
                self.userAltitude = self.locationManager.location?.altitude
                above = String(Int(self.userAltitude))
                self.userLatitude = self.locationManager.location?.coordinate.latitude
                self.userLongitude = self.locationManager.location?.coordinate.longitude
                cord = self.coordinateString(self.userLatitude, self.userLongitude)
                
            default:
                windName = "Missing"
                above = "Unknown"
                cord = "Unknown"
            
            }

            //self.windNameReturned.lineBreakMode = NSLineBreakMode.byWordWrapping
            self.windNameReturned.text = windName
            self.aboveSeaLabel.text = above
            self.coordinateDataLabel.text = cord
          
            
          switch UIDevice.current.orientation {
          case .faceDown: return -originalHeading
          default: return originalHeading
          }
        }()
        
        
        return CGFloat(self.orientationAdjustment().degreesToRadians + heading)
      }
      
        
        
      UIView.animate(withDuration: 0.5) {
        let angle = computeNewAngle(with: CGFloat(newHeading))
        
        self.imageView.transform = CGAffineTransform(rotationAngle: angle)
        self.degreesView.transform = CGAffineTransform(rotationAngle: angle)
        self.polesView.transform = CGAffineTransform(rotationAngle: angle)
        
        //poles orientation
        self.northImage.transform = CGAffineTransform(rotationAngle: -angle)
        self.southImage.transform = CGAffineTransform(rotationAngle: -angle)
        self.westImage.transform = CGAffineTransform(rotationAngle: -angle)
        self.eastImage.transform = CGAffineTransform(rotationAngle: -angle)
        
        //degrees orientation
        self.zeroDegrees.transform = CGAffineTransform(rotationAngle: -angle)
        self.degrees30.transform = CGAffineTransform(rotationAngle: -angle)
        self.degrees60.transform = CGAffineTransform(rotationAngle: -angle)
        self.degrees90.transform = CGAffineTransform(rotationAngle: -angle)
        self.degrees120.transform = CGAffineTransform(rotationAngle: -angle)
        self.degrees150.transform = CGAffineTransform(rotationAngle: -angle)
        self.degrees180.transform = CGAffineTransform(rotationAngle: -angle)
        self.degrees210.transform = CGAffineTransform(rotationAngle: -angle)
        self.degrees240.transform = CGAffineTransform(rotationAngle: -angle)
        self.degrees270.transform = CGAffineTransform(rotationAngle: -angle)
        self.degrees300.transform = CGAffineTransform(rotationAngle: -angle)
        self.degrees330.transform = CGAffineTransform(rotationAngle: -angle)
      }
    }
    
  }
    
    
    func coordinateString(_ latitude: Double,_ longitude: Double) -> String {
        var latSeconds = Int(latitude * 3600)
        let latDegrees = latSeconds / 3600
        latSeconds = abs(latSeconds % 3600)
        let latMinutes = latSeconds / 60
        latSeconds %= 60
        var longSeconds = Int(longitude * 3600)
        let longDegrees = longSeconds / 3600
        longSeconds = abs(longSeconds % 3600)
        let longMinutes = longSeconds / 60
        longSeconds %= 60
        return String(format:"%d°%d'%d\"%@      %d°%d'%d\"%@",
                      abs(latDegrees),
                      latMinutes,
                      latSeconds, latDegrees >= 0 ? "N" : "S",
                      abs(longDegrees),
                      longMinutes,
                      longSeconds,
                      longDegrees >= 0 ? "E" : "V" )
    }
    
    
    
    func degreesDistanceByDevice(){
        
        switch UIDevice.current.deviceType {
            
        case .iPhone4, .iPhone4S:
            
            self.windNameReturned.font = windNameReturned.font.withSize(20)
            self.arrowImageY.constant = -70
            self.compassBgY.constant = -70
            self.firstCell.constant = 60
            self.bottomDegrees.font = bottomDegrees.font.withSize(30)
            self.bottomDegreesSymbol.font = bottomDegreesSymbol.font.withSize(30)
            self.bottomDegreesHeight.constant = 30
            
            self.cell2Height.constant = 35
            self.altitudeCellHeight.constant = 35
            self.aboveSeaLabel.font = aboveSeaLabel.font.withSize(25)
            self.metersLabel.font = metersLabel.font.withSize(25)
            
            //degrees
            self.topZero.constant = -10
            
            self.right30.constant = 57
            self.top30.constant = 7
            
            self.right60.constant = 6
            self.top60.constant = 57
            
            self.right90.constant = -10
            
            self.right120.constant = 5
            self.bottom120.constant = 55
            
            self.right150.constant = 55
            self.bottom150.constant = 5
            
            self.bottom180.constant = -10
            
            self.left210.constant = 55
            self.bottom210.constant = 5
            
            self.left240.constant = 4
            self.bottom240.constant = 55
            
            self.left270.constant = -13
            
            self.left300.constant = 5
            self.top300.constant = 55
            
            self.left330.constant = 55
            self.top330.constant = 5
            
            
            
            self.zeroDegrees.font = zeroDegrees.font.withSize(15)
            
            self.degrees30.font = degrees30.font.withSize(15)
            
            self.degrees60.font = degrees60.font.withSize(15)
            
            self.degrees90.font = degrees90.font.withSize(15)
            
            self.degrees120.font = degrees120.font.withSize(15)
            
            self.degrees150.font = degrees150.font.withSize(15)
            
            self.degrees180.font = degrees180.font.withSize(15)
            
            self.degrees210.font = degrees210.font.withSize(15)
            
            self.degrees240.font = degrees240.font.withSize(15)
            
            self.degrees270.font = degrees270.font.withSize(15)
            
            self.degrees300.font = degrees300.font.withSize(15)
            
            self.degrees330.font = degrees330.font.withSize(15)
            
            //images
            self.northDistance.constant = 12
            self.northWidth.constant = 14
            self.northHeight.constant = 14
            
            self.southDistance.constant = 12
            self.southWidth.constant = 14
            self.southHeight.constant = 14
            
            self.eastDistance.constant = 12
            self.eastWidth.constant = 14
            self.eastHeight.constant = 14
            
            self.westDistance.constant = 12
            self.westWidth.constant = 14
            self.westHeight.constant = 14
            


            
        case .iPhone5, .iPhone5S, .iPhoneSE, .iPhone5C:
            
            //degrees
            self.topZero.constant = -10
            
            self.right30.constant = 57
            self.top30.constant = 7
            
            self.right60.constant = 6
            self.top60.constant = 57
            
            self.right90.constant = -10
            
            self.right120.constant = 5
            self.bottom120.constant = 55
            
            self.right150.constant = 55
            self.bottom150.constant = 5
            
            self.bottom180.constant = -10
            
            self.left210.constant = 55
            self.bottom210.constant = 5
            
            self.left240.constant = 4
            self.bottom240.constant = 55
            
            self.left270.constant = -13
            
            self.left300.constant = 5
            self.top300.constant = 55
            
            self.left330.constant = 55
            self.top330.constant = 5
            
            
            
            
            //images
            self.northDistance.constant = 12
            self.northWidth.constant = 14
            self.northHeight.constant = 14
            
            self.southDistance.constant = 12
            self.southWidth.constant = 14
            self.southHeight.constant = 14
            
            self.eastDistance.constant = 12
            self.eastWidth.constant = 14
            self.eastHeight.constant = 14
            
            self.westDistance.constant = 12
            self.westWidth.constant = 14
            self.westHeight.constant = 14
            
            
        case .iPhone6,.iPhone6S, .iPhone7:
            
            self.altitudeLabel.font = altitudeLabel.font.withSize(20)
            self.coordinateLabel.font = coordinateLabel.font.withSize(20)
            self.windNameReturned.font = windNameReturned.font.withSize(34)
         
            
        case .iPhone7Plus,.iPhone6Plus, .iPhone6SPlus:
            
            self.altitudeLabel.font = altitudeLabel.font.withSize(20)
            self.coordinateLabel.font = coordinateLabel.font.withSize(20)
            self.windNameReturned.font = windNameReturned.font.withSize(34)
            self.bottomDegrees.font = bottomDegrees.font.withSize(45)
            self.bottomDegreesHeight.constant = 45
            self.coordinateDataLabel.font = coordinateDataLabel.font.withSize(20)
            
            //images
            self.northDistance.constant = 17
            self.southDistance.constant = 17
            self.eastDistance.constant = 17
            self.westDistance.constant = 17
            
            
            //degrees
            // self.topZero.constant = -10
            
            self.right30.constant = 70
            self.top30.constant = 10
            
            self.right60.constant = 10
            self.top60.constant = 70
            
            //self.right90.constant = -10
            
            self.right120.constant = 8
            self.bottom120.constant = 68
            
            self.right150.constant = 68
            self.bottom150.constant = 8
            
            // self.bottom180.constant = -10
            
            self.left210.constant = 68
            self.bottom210.constant = 8
            
            self.left240.constant = 8
            self.bottom240.constant = 70
            
            self.left270.constant = -20
            
            self.left300.constant = 8
            self.top300.constant = 68
            
            self.left330.constant = 68
            self.top330.constant = 8

            
            
            
       case .iPad, .iPad2, .iPad3, .iPad4, .iPadAir, .iPadAir2, .iPadMini, .iPadMini3, .iPadMini4, .iPadMiniRetina, .iPadPro9Inch:
            
                
            self.view4Center.constant = -80
            
            self.coordinateDataLabel.font = coordinateDataLabel.font.withSize(35)
            self.aboveSeaLabel.font = aboveSeaLabel.font.withSize(48)
            self.metersLabel.font = metersLabel.font.withSize(48)
            
            self.coordinateLabelHeight.constant = 40
            self.coordinateLabel.font = coordinateLabel.font.withSize(35)
            self.flagWifth.constant = 40
            self.flagHeight.constant = 40
            
            self.altitudeLabelHeight.constant = 40
            self.altitudeLabel.font = altitudeLabel.font.withSize(35)
            self.sageataWidth.constant = 40
            self.sageataHeight.constant = 40
            
            self.bottomDegrees.font = bottomDegrees.font.withSize(60)
            self.bottomDegreesSymbol.font = bottomDegreesSymbol.font.withSize(60)
            self.bottomDegreesHeight.constant = 62
            
            self.windNameReturned.font = windNameReturned.font.withSize(50)
            
            //cellsHeight
            self.firstCell.constant = 160
            self.cell2Height.constant = 60
            self.altitudeCellHeight.constant = 60
            
            //arrowImage
            self.arrowWidth.constant = -300
            self.arrowHeight.constant = -300
            
            
            //images
            self.northDistance.constant = 24
            self.northWidth.constant = 33
            self.northHeight.constant = 33
            
            self.southDistance.constant = 24
            self.southWidth.constant = 33
            self.southHeight.constant = 33
            
            self.eastDistance.constant = 24
            self.eastWidth.constant = 33
            self.eastHeight.constant = 33
            
            self.westDistance.constant = 24
            self.westWidth.constant = 33
            self.westHeight.constant = 33
            
            
            //degrees
            self.zeroDegrees.font = zeroDegrees.font.withSize(20)
            self.topZero.constant = -20
            
            self.degrees30.font = degrees30.font.withSize(20)
            self.right30.constant = 114
            self.top30.constant = 14
            
            self.degrees60.font = degrees60.font.withSize(20)
            self.right60.constant = 12
            self.top60.constant = 114
            
            self.degrees90.font = degrees90.font.withSize(20)
            self.right90.constant = -20
            
            self.degrees120.font = degrees120.font.withSize(20)
            self.right120.constant = 10
            self.bottom120.constant = 110
            
            self.degrees150.font = degrees150.font.withSize(20)
            self.right150.constant = 110
            self.bottom150.constant = 10
            
            self.degrees180.font = degrees180.font.withSize(20)
            self.bottom180.constant = -20
            
            self.degrees210.font = degrees210.font.withSize(20)
            self.left210.constant = 110
            self.bottom210.constant = 10
            
            self.degrees240.font = degrees240.font.withSize(20)
            self.left240.constant = 8
            self.bottom240.constant = 110
            
            self.degrees270.font = degrees270.font.withSize(20)
            self.left270.constant = -25
            
            self.degrees300.font = degrees300.font.withSize(20)
            self.left300.constant = 10
            self.top300.constant = 110
            
            self.degrees330.font = degrees330.font.withSize(20)
            self.left330.constant = 110
            self.top330.constant = 10

            
        case .iPadPro12Inch:
         
            self.view4Center.constant = -80
            
            self.coordinateDataLabel.font = coordinateDataLabel.font.withSize(35)
            self.aboveSeaLabel.font = aboveSeaLabel.font.withSize(48)
            self.metersLabel.font = metersLabel.font.withSize(48)
            
            self.coordinateLabelHeight.constant = 40
            self.coordinateLabel.font = coordinateLabel.font.withSize(35)
            self.flagWifth.constant = 40
            self.flagHeight.constant = 40
            
            self.altitudeLabelHeight.constant = 40
            self.altitudeLabel.font = altitudeLabel.font.withSize(35)
            self.sageataWidth.constant = 40
            self.sageataHeight.constant = 40
            
            self.bottomDegrees.font = bottomDegrees.font.withSize(60)
            self.bottomDegreesSymbol.font = bottomDegreesSymbol.font.withSize(60)
            self.bottomDegreesHeight.constant = 62
          
            self.windNameReturned.font = windNameReturned.font.withSize(60)
            
            //cellsHeight
            self.firstCell.constant = 160
            self.cell2Height.constant = 60
            self.altitudeCellHeight.constant = 60
            
            //arrowImage
            self.arrowWidth.constant = -550
            self.arrowHeight.constant = -550
            
            
            //images
            self.northDistance.constant = 24
            self.northWidth.constant = 33
            self.northHeight.constant = 33
            
            self.southDistance.constant = 24
            self.southWidth.constant = 33
            self.southHeight.constant = 33
            
            self.eastDistance.constant = 24
            self.eastWidth.constant = 33
            self.eastHeight.constant = 33
            
            self.westDistance.constant = 24
            self.westWidth.constant = 33
            self.westHeight.constant = 33
            
            
            //degrees
            self.zeroDegrees.font = zeroDegrees.font.withSize(20)
            self.topZero.constant = -20
            
            self.degrees30.font = degrees30.font.withSize(20)
            self.right30.constant = 114
            self.top30.constant = 14
            
            self.degrees60.font = degrees60.font.withSize(20)
            self.right60.constant = 12
            self.top60.constant = 114
            
            self.degrees90.font = degrees90.font.withSize(20)
            self.right90.constant = -20
            
            self.degrees120.font = degrees120.font.withSize(20)
            self.right120.constant = 10
            self.bottom120.constant = 110
            
            self.degrees150.font = degrees150.font.withSize(20)
            self.right150.constant = 110
            self.bottom150.constant = 10
            
            self.degrees180.font = degrees180.font.withSize(20)
            self.bottom180.constant = -20
            
            self.degrees210.font = degrees210.font.withSize(20)
            self.left210.constant = 110
            self.bottom210.constant = 10
            
            self.degrees240.font = degrees240.font.withSize(20)
            self.left240.constant = 8
            self.bottom240.constant = 110
            
            self.degrees270.font = degrees270.font.withSize(20)
            self.left270.constant = -25
            
            self.degrees300.font = degrees300.font.withSize(20)
            self.left300.constant = 10
            self.top300.constant = 110
            
            self.degrees330.font = degrees330.font.withSize(20)
            self.left330.constant = 110
            self.top330.constant = 10
            
            
            
        default:
            
            break
        
            
        }
        
    }
    
    
    
    func shadow(im: UIImageView) {

        im.layer.shadowOffset = CGSize(width: 10, height: 10)
        im.layer.shadowColor = UIColor.black.cgColor
        im.layer.shadowRadius = 5
        im.layer.shadowOpacity = 0.5
        im.layer.masksToBounds = false
        im.clipsToBounds = false
    }
  
}

extension CompassViewController: MapViewControllerDelegate {
  func update(location: CLLocation) {
    yourLocation = location
  }
}
