//
//  ProfilViewController.swift
//  Pro App
//
//  Created by Scripchin Mihail on 1/31/20.
//  Copyright © 2020 Scripchin Mihail. All rights reserved.
//

import UIKit
import FacebookLogin
import FacebookCore

class ProfilViewController: UIViewController {

    @IBOutlet weak var collectionView: UICollectionView!
    @IBOutlet weak var display: UILabel!
    
    var menuSir: [Menu] = {
        var blankMenu = Menu()
        blankMenu.nume = "Capriciosa"
        blankMenu.numeImagine = "pizza1"
        
        var blankMenu1 = Menu()
        blankMenu1.nume = "Diavola"
        blankMenu1.numeImagine = "pizza2"
        
        var blankMenu2 = Menu()
        blankMenu2.nume = "Prosciutto e fungi"
        blankMenu2.numeImagine = "pizza2"
        
        var blankMenu3 = Menu()
        blankMenu3.nume = "Frutti di mare"
        blankMenu3.numeImagine = "pizza4"
        
        return [blankMenu, blankMenu1, blankMenu2, blankMenu3]
    }()
    var timer = Timer()
    var timeRun = false
    var secunde = 0
    
    
    override func viewDidLoad() {
        runTimer()
        
        
        super.viewDidLoad()

        collectionView.dataSource = self
        collectionView.delegate = self
        self.collectionView.backgroundColor = UIColor.clear
        self.collectionView.backgroundView = UIView.init(frame: CGRect.zero)
        
        // Do any additional setup after loading the view.
    }
    
    
    func runTimer() {
        timer = Timer.scheduledTimer(timeInterval: 1, target: self, selector: (#selector(ProfilViewController.updateTimer)), userInfo: nil, repeats: true)
         timeRun = true
    }
    
    
    @objc func updateTimer() {
              secunde += 1
              display.text = timeString(time: TimeInterval(secunde))
         
    }
    
    func timeString(time:TimeInterval) -> String {
    let ore = Int(time) / 3600
    let minute = Int(time) / 60 % 60
    let secunde = Int(time) % 60
        return String(format:"%02i:%02i:%02i", ore, minute, secunde)
    }
   
    @IBAction func logoutClick(_ sender: Any) {
        
        timer.invalidate()

        let alert = UIAlertController(title: "Sesiune incheiata", message: "Timp de lucru, \(String(display.text!))", preferredStyle: UIAlertController.Style.alert)
        alert.addAction(UIAlertAction(title: "OK", style: UIAlertAction.Style.default, handler: {action in
        if let token = AccessToken.current {
            AccessToken.current = nil
            let log = self.storyboard?.instantiateViewController(withIdentifier: "ViewController") as? ViewController
            self.present(log!, animated: true, completion: nil)
            
            
        }
  
    }
    
)
)

        self.present(alert, animated: true, completion: nil)
    }
    
    
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        if segue.identifier == "showVC" {
            if let vc = segue.destination as? DetaliiViewController {
                let menu = sender as? Menu
                vc.menu = menu
            }
        }
    }
    
    
    
    
}


extension ProfilViewController: UICollectionViewDataSource, UICollectionViewDelegate {
    func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        return menuSir.count
    }
    
    
    func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
        if let itemCell = collectionView.dequeueReusableCell(withReuseIdentifier: "menuCell", for: indexPath) as? MenuCollectionViewCell {
            
            itemCell.menu = menuSir[indexPath.row]
            
            return itemCell
        }
        return UICollectionViewCell()
    }
    
    func collectionView(_ collectionView: UICollectionView, didSelectItemAt indexPath: IndexPath) {
        let menu = menuSir[indexPath.row]
        self.performSegue(withIdentifier: "showVC", sender: menu)
    }
}

