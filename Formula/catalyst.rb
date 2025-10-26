class Catalyst < Formula
  desc "AI-powered development environment with MCP servers and BMAD methodology"
  homepage "https://github.com/azywicki/catalyst"
  url "https://github.com/azywicki/catalyst/releases/download/v0.1.0/catalyst-0.1.0.tar.gz"
  sha256 "WILL_BE_CALCULATED_DURING_BUILD"
  version "0.1.0"
  license "AGPL-3.0-or-later"

  # Dependencies
  depends_on "node@20"

  def install
    # Install everything to libexec to avoid conflicts
    libexec.install Dir["*"]

    # Create bin symlink
    bin.install_symlink libexec/"bin/catalyst"

    # Note: node_modules are already bundled in the tarball
    # No need to run npm install during Homebrew installation
  end

  def post_install
    # Create catalyst directories in user home
    catalyst_dir = "#{Dir.home}/.catalyst"
    unless File.directory?(catalyst_dir)
      mkdir_p catalyst_dir
      mkdir_p "#{catalyst_dir}/logs"
      mkdir_p "#{catalyst_dir}/cache"
      mkdir_p "#{catalyst_dir}/backups"
    end

    ohai "🎉 Catalyst #{version} installed successfully!"
    ohai ""
    ohai "Next steps:"
    ohai "  1. Run 'catalyst setup' to configure your environment"
    ohai "  2. Run 'catalyst verify' to check installation"
    ohai ""
    ohai "Documentation: https://github.com/azywicki/catalyst"
  end

  def caveats
    <<~EOS
      Catalyst requires:
        • Node.js 20+ (installed as dependency)
        • macOS 13.0+ (Ventura or later)

      Optional but recommended:
        • Continue.dev or Claude Code extension for VS Code
        • LM Studio for local AI models
        • Docker Desktop (for Docker MCP server)

      Get started:
        catalyst setup
    EOS
  end

  test do
    # Test that the binary exists and runs
    system bin/"catalyst", "--version"
    assert_match version.to_s, shell_output("#{bin}/catalyst --version")

    # Test that help command works
    system bin/"catalyst", "--help"
  end
end
