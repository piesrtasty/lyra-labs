//
//  ShareViewController.swift
//  Save
//
//  Created by Luke Hamilton on 7/9/20.
//

import MobileCoreServices
import Photos
import UIKit
import Social
import KeychainAccess

class ShareViewController: SLComposeServiceViewController {
  
  let hostAppBundleIdentifier = "com.lyralabs.app"
  let sharedKey = "ShareKey"
  var magicAuthCookie = ""

    override func isContentValid() -> Bool {
        // Do validation of contentText and/or NSExtensionContext attachments here
        return true
    }

    override func viewDidLoad() {
      super.viewDidLoad()
      navigationController?.navigationBar.tintColor = .white
      navigationController?.navigationBar.backgroundColor = UIColor(red:0.39, green:0.46, blue:0.86, alpha:1.00)
      let keychain = Keychain(service: "com.lyralabs.app", accessGroup: "KU5GP44363.com.lyralabs.app")
      if let value = try! keychain.getString("magicAuthCookie") {
        let data = value
        self.magicAuthCookie = data
      } else {
        displayUIAlertController(title: "Log in to save to Lyra Labs 🤪")
      }
    }
  
    func closeExtensionHandler(alert: UIAlertAction!) {
      self.extensionContext?.completeRequest(returningItems: [], completionHandler:nil)
    }
  
    func displayUIAlertController(title: String, message: String? = nil) {
      let alert = UIAlertController(title: title, message: message, preferredStyle: .alert)
      alert.addAction(UIAlertAction(title: "OK", style: UIAlertAction.Style.default, handler: { (action: UIAlertAction!) -> () in
        self.extensionContext!.completeRequest(returningItems: [], completionHandler: nil)
      }))
      self.present(alert, animated: true, completion: nil)
    }
  
    override func didSelectPost() {
      if let item = extensionContext?.inputItems.first as? NSExtensionItem {
          if let itemProvider = item.attachments?.first {
              if itemProvider.hasItemConformingToTypeIdentifier("public.url") {
                  itemProvider.loadItem(forTypeIdentifier: "public.url", options: nil, completionHandler: { (url, error) -> Void in
                      if let shareURL = url as? NSURL {
                        // Prepare URL
                        let url = URL(string: "http://192.168.1.195:3000/api/save")
//                        let url = URL(string: "https://lyralabs.io/api/save")
                        guard let requestUrl = url else { fatalError() }
                        // Prepare URL Request Object
                        var request = URLRequest(url: requestUrl)
                        request.httpMethod = "POST"
                        // HTTP Request Parameters which will be sent in HTTP Request Body
                        let postString = "givenUrl=\(shareURL)&title=\(self.textView.text as String)";
                        // Set HTTP Request Body
                        request.httpBody = postString.data(using: String.Encoding.utf8);
                        request.setValue(self.magicAuthCookie as String, forHTTPHeaderField: "Cookie")
                        request.httpShouldHandleCookies = true
                        let task = URLSession.shared.dataTask(with: request) { (data, response, error) in
                          //  Check for Error
                          if let error = error {
                            print("Error took place \(error)")
                            DispatchQueue.main.async {
                              self.displayUIAlertController(title: "Failed to save 😔", message: "Please try again later.")
                            }
                            return
                          }
                          if let httpResponse = response as? HTTPURLResponse {
                            if httpResponse.statusCode == 401 {
                              DispatchQueue.main.async {
                                self.displayUIAlertController(title: "Please login to Lyra Labs 🤪")
                              }
                            } else if httpResponse.statusCode == 200 {
                              DispatchQueue.main.async {
                                self.displayUIAlertController(title: "Saved to Lyra Labs! 🥳")
                              }
                            } else {
                              DispatchQueue.main.async {
                                self.displayUIAlertController(title: "Failed to save 😔", message: "Please try again later.")
                              }
                            }
                          }
                        }
                        task.resume()
                      }
                  })
              }
          }
      }
    }
}
