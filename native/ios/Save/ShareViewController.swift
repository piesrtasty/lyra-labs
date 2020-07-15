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
  var accessToken = ""

    override func isContentValid() -> Bool {
        // Do validation of contentText and/or NSExtensionContext attachments here
        return true
    }
  
    override func viewDidLoad() {
      super.viewDidLoad()
      let keychain = Keychain(service: "com.lyralabs.app", accessGroup: "KU5GP44363.com.lyralabs.app")
      if let value = try! keychain.getString("session") {
        print("AAAAA")
        let data = Data(value.utf8)
        do {
            if let json = try JSONSerialization.jsonObject(with: data, options: []) as? [String: Any] {
              let token = json["accessToken"] as! String
              self.accessToken = token
            }
        } catch let error as NSError {
            print("Failed to load: \(error.localizedDescription)")
        }
      } else {
         let alert = UIAlertController(title: "Log in to save to Lyra Labs.", message: nil, preferredStyle: UIAlertController.Style.alert)
             alert.addAction(UIAlertAction(title: "Ok", style: UIAlertAction.Style.default, handler: closeExtensionHandler))
             present(alert, animated: true, completion: nil)
      }
      
    }
  
    func closeExtensionHandler(alert: UIAlertAction!) {
      self.extensionContext?.completeRequest(returningItems: [], completionHandler:nil)
    }
  
    override func didSelectPost() {
      print("------on did select post ------")
      print(self.accessToken)
      print("----------------")
      
      if let item = extensionContext?.inputItems.first as? NSExtensionItem {
          if let itemProvider = item.attachments?.first {
              if itemProvider.hasItemConformingToTypeIdentifier("public.url") {
                  itemProvider.loadItem(forTypeIdentifier: "public.url", options: nil, completionHandler: { (url, error) -> Void in
                      if let shareURL = url as? NSURL {
                        // Prepare URL
                        let url = URL(string: "http://localhost:4000/save")
                        guard let requestUrl = url else { fatalError() }
                        // Prepare URL Request Object
                        var request = URLRequest(url: requestUrl)
                        request.httpMethod = "POST"
                        // HTTP Request Parameters which will be sent in HTTP Request Body
                        let postString = "givenUrl=\(shareURL)&title=\(self.textView.text as String)";
                        // Set HTTP Request Body
                        request.httpBody = postString.data(using: String.Encoding.utf8);
                        request.setValue("Bearer \(self.accessToken as String)", forHTTPHeaderField: "Authorization")
                        // Perform HTTP Request
                        let task = URLSession.shared.dataTask(with: request) { (data, response, error) in
                          // Check for Error
                          if let error = error {
                            print("Error took place \(error)")
                            return
                          }
                          // Convert HTTP Response Data to a String
                          if let data = data, let dataString = String(data: data, encoding: .utf8) {
                            print("Response data string:\n \(dataString)")
                          }
                        }
                        task.resume()
                          // do what you want to do with shareURL
                      }
//                      self.extensionContext?.completeRequest(returningItems: [], completionHandler:nil)
                  })
              }
          }
      }
//      self.extensionContext?.completeRequest(returningItems: [], completionHandler:nil)
     
    }
  
    
  
  
//    override func didSelectPost() {
//        // This is called after the user selects Post. Do the upload of contentText and/or NSExtensionContext attachments.
//
//
//
//        // Inform the host that we're done, so it un-blocks its UI. Note: Alternatively you could call super's -didSelectPost, which will similarly complete the extension context.
//        self.extensionContext!.completeRequest(returningItems: [], completionHandler: nil)
//    }

    override func configurationItems() -> [Any]! {
        // To add configuration options via table cells at the bottom of the sheet, return an array of SLComposeSheetConfigurationItem here.
        return []
    }
  
    private func handleUnsupportedMediaType() {
        let alert = UIAlertController(title: "This media type is not supported yet.", message: nil, preferredStyle: UIAlertController.Style.alert)
        alert.addAction(UIAlertAction(title: "Ok", style: UIAlertAction.Style.default, handler: nil))
        present(alert, animated: true, completion: nil)
    }

}

extension NSItemProvider {
  var isURL: Bool {
    return hasItemConformingToTypeIdentifier(kUTTypeURL as String)
  }
  var isText: Bool {
    return hasItemConformingToTypeIdentifier(kUTTypeText as String)
  }
}
