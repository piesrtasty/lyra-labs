
import MobileCoreServices
import Photos
import Social
import UIKit
import KeychainAccess
//import Foundation
//import Security




class CustomShareViewController: UIViewController {
    // MARK: Properties
    @IBOutlet weak var authLabel: UILabel!
    @IBOutlet weak var statusLabel: UILabel!
    @IBOutlet var tapRecognizer: UITapGestureRecognizer!
    // TODO: IMPORTANT: This should be your host app bundle identifier
    let hostAppBundleIdentifier = "com.lyralabs.app"
    let sharedKey = "ShareKey"
    var sharedMedia: [SharedMediaFile] = []
    var sharedText: [String] = []
    let imageContentType = kUTTypeImage as String
    let videoContentType = kUTTypeMovie as String
    let textContentType = kUTTypeText as String
    let urlContentType = kUTTypeURL as String
    let fileURLType = kUTTypeFileURL as String

    // MARK: Actions
    @IBAction func triggerTapRecognizer(_ sender: Any) {
        extensionContext!.completeRequest(returningItems: nil, completionHandler: nil)
    }

    override func viewDidLoad() {
        super.viewDidLoad()
        let keychain = Keychain(service: "com.lyralabs.app", accessGroup: "KU5GP44363.com.lyralabs.app")
        if let value = try! keychain.getData("session") {
          if let content = extensionContext!.inputItems[0] as? NSExtensionItem {
              if let contents = content.attachments {
                  for (index, attachment) in contents.enumerated() {
                      if attachment.hasItemConformingToTypeIdentifier(imageContentType) {
                          handleUnsupportedMediaType()
                      } else if attachment.hasItemConformingToTypeIdentifier(textContentType) {
                          handleUnsupportedMediaType()
                      } else if attachment.hasItemConformingToTypeIdentifier(fileURLType) {
                          handleUnsupportedMediaType()
                      } else if attachment.hasItemConformingToTypeIdentifier(urlContentType) {
                          handleUrl(content: content, attachment: attachment, index: index)
                      } else if attachment.hasItemConformingToTypeIdentifier(videoContentType) {
                          handleUnsupportedMediaType()
                      }
                  }
              }
          }
        } else {
            statusLabel.isHidden = false
            statusLabel.text = "Log in to save to Lyra Labs"
        }
    }

    private func handleUnsupportedMediaType() {
        let alert = UIAlertController(title: "This media type is not supported yet.", message: nil, preferredStyle: UIAlertController.Style.alert)
        alert.addAction(UIAlertAction(title: "Ok", style: UIAlertAction.Style.default, handler: nil))
        present(alert, animated: true, completion: nil)
    }

    private func handleUrl (content: NSExtensionItem, attachment: NSItemProvider, index: Int) {
        attachment.loadItem(forTypeIdentifier: urlContentType, options: nil) { [weak self] data, error in
          
          if error == nil, let item = data as? URL, let this = self {
            // Prepare URL
            let url = URL(string: "http://localhost:4000/bookmarks")
            guard let requestUrl = url else { fatalError() }
            // Prepare URL Request Object
            var request = URLRequest(url: requestUrl)
            request.httpMethod = "POST"
             
            // HTTP Request Parameters which will be sent in HTTP Request Body
            let postString = "givenUrl=\(item)";
            // Set HTTP Request Body
            request.httpBody = postString.data(using: String.Encoding.utf8);
            // Perform HTTP Request
            let task = URLSession.shared.dataTask(with: request) { (data, response, error) in
                    
                    // Check for Error
                    if let error = error {
                        print("Error took place \(error)")
                        self?.statusLabel.isHidden = false
                        self?.statusLabel.text = "Failed to save to Lyra Labs. Please try again later."
                        
                        return
                    }
             
                    // Convert HTTP Response Data to a String
                    if let data = data, let dataString = String(data: data, encoding: .utf8) {
                        print("Response data string:\n \(dataString)")
                        self.statusLabel.isHidden = false
                        self.statusLabel.text = "Saved to Lyra Labs"
                    }
            }
            task.resume()
            
//            print("calling handleUrl")
//            print("item")
            
//            print("done")
//            this.sharedText.append(item.absoluteString)
//    //
//            // If this is the last item, save imagesData in userDefaults and redirect to host app
//            if index == (content.attachments?.count)! - 1 {
//              let userDefaults = UserDefaults(suiteName: "group.\(this.hostAppBundleIdentifier)")
//              userDefaults?.set(this.sharedText, forKey: this.sharedKey)
//              userDefaults?.synchronize()
////               self?.didSelectPost();
//              this.redirectToHostApp(type: .text)
//            }
            
          } else {
            self?.dismissWithError()
          }
        }
      }

    private func dismissWithError() {
        print("[ERROR] Error loading data!")
        let alert = UIAlertController(title: "Error", message: "Error loading data", preferredStyle: .alert)

        let action = UIAlertAction(title: "Error", style: .cancel) { _ in
            self.dismiss(animated: true, completion: nil)
        }

        alert.addAction(action)
        present(alert, animated: true, completion: nil)
        extensionContext!.completeRequest(returningItems: [], completionHandler: nil)
    }

    private func redirectToHostApp(type: RedirectType) {
        print("GOT HERE CCCCC")
        let url = URL(string: "ShareMedia://dataUrl=\(sharedKey)#\(type)")
        print("url")
        print(url)
        var responder = self as UIResponder?
        print("responser")
        print(responder)
        let selectorOpenURL = sel_registerName("openURL:")
        print("selectorOpenURL")
        print(selectorOpenURL)

        while responder != nil {
          print("E")
            if (responder?.responds(to: selectorOpenURL))! {
              print("DDDDDD")
                _ = responder?.perform(selectorOpenURL, with: url)
            }
            responder = responder!.next
        }
        extensionContext!.completeRequest(returningItems: [], completionHandler: nil)
    }

    enum RedirectType {
        case media
        case text
        case file
    }

    func getExtension(from url: URL, type: SharedMediaType) -> String {
        let parts = url.lastPathComponent.components(separatedBy: ".")
        var ex: String?
        if parts.count > 1 {
            ex = parts.last
        }

        if ex == nil {
            switch type {
            case .image:
                ex = "PNG"
            case .video:
                ex = "MP4"
            case .file:
                ex = "TXT"
            }
        }
        return ex ?? "Unknown"
    }

    func getFileName(from url: URL) -> String {
        var name = url.lastPathComponent

        if name == "" {
            name = UUID().uuidString + "." + getExtension(from: url, type: .file)
        }

        return name
    }

    func copyFile(at srcURL: URL, to dstURL: URL) -> Bool {
        do {
            if FileManager.default.fileExists(atPath: dstURL.path) {
                try FileManager.default.removeItem(at: dstURL)
            }
            try FileManager.default.copyItem(at: srcURL, to: dstURL)
        } catch {
            print("Cannot copy item at \(srcURL) to \(dstURL): \(error)")
            return false
        }
        return true
    }

    private func getSharedMediaFile(forVideo: URL) -> SharedMediaFile? {
        let asset = AVAsset(url: forVideo)
        let duration = (CMTimeGetSeconds(asset.duration) * 1000).rounded()
        let thumbnailPath = getThumbnailPath(for: forVideo)

        if FileManager.default.fileExists(atPath: thumbnailPath.path) {
            return SharedMediaFile(path: forVideo.absoluteString, thumbnail: thumbnailPath.absoluteString, duration: duration, type: .video)
        }

        var saved = false
        let assetImgGenerate = AVAssetImageGenerator(asset: asset)
        assetImgGenerate.appliesPreferredTrackTransform = true
        //        let scale = UIScreen.main.scale
        assetImgGenerate.maximumSize = CGSize(width: 360, height: 360)
        do {
            let img = try assetImgGenerate.copyCGImage(at: CMTimeMakeWithSeconds(600, preferredTimescale: Int32(1.0)), actualTime: nil)
            try UIImage.pngData(UIImage(cgImage: img))()?.write(to: thumbnailPath)
            saved = true
        } catch {
            saved = false
        }

        return saved ? SharedMediaFile(path: forVideo.absoluteString, thumbnail: thumbnailPath.absoluteString, duration: duration, type: .video) : nil
    }

    private func getThumbnailPath(for url: URL) -> URL {
        let fileName = Data(url.lastPathComponent.utf8).base64EncodedString().replacingOccurrences(of: "==", with: "")
        let path = FileManager.default
            .containerURL(forSecurityApplicationGroupIdentifier: "group.\(hostAppBundleIdentifier)")!
            .appendingPathComponent("\(fileName).jpg")
        return path
    }

    class SharedMediaFile: Codable {
        var path: String // can be image, video or url path. It can also be text content
        var thumbnail: String? // video thumbnail
        var duration: Double? // video duration in milliseconds
        var type: SharedMediaType

        init(path: String, thumbnail: String?, duration: Double?, type: SharedMediaType) {
            self.path = path
            self.thumbnail = thumbnail
            self.duration = duration
            self.type = type
        }

        // Debug method to print out SharedMediaFile details in the console
        func toString() {
            print("[SharedMediaFile] \n\tpath: \(path)\n\tthumbnail: \(thumbnail)\n\tduration: \(duration)\n\ttype: \(type)")
        }
    }

    enum SharedMediaType: Int, Codable {
        case image
        case video
        case file
    }

    func toData(data: [SharedMediaFile]) -> Data {
        let encodedData = try? JSONEncoder().encode(data)
        return encodedData!
    }
}

extension Array {
    subscript(safe index: UInt) -> Element? {
        return Int(index) < count ? self[Int(index)] : nil
    }
}
